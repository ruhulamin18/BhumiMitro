async function testRoutes() {
  const routes = [
    '/',
    '/verify',
    '/char-land',
    '/history',
    '/history/BM-DEMO-001',
    '/multi-office',
    '/reports',
    '/report/BM-DEMO-001',
    '/result/BM-DEMO-001',
    '/admin',
    '/qr-verify',
    '/api/health',
    '/api/records',
    '/api/records/BM-DEMO-001',
  ];

  console.log('Testing BhumiMitro Routes on http://localhost:3000...\n');
  let failures = 0;

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      if (res.ok) {
        console.log(`✅ [${res.status} OK] ${route}`);
      } else {
        console.error(`❌ [${res.status} ${res.statusText}] ${route}`);
        failures++;
      }
    } catch (err) {
      console.error(`❌ [CONNECTION ERROR] ${route}: ${err.message}`);
      failures++;
    }
  }

  // Also test POST /api/verify
  try {
    const postRes = await fetch('http://localhost:3000/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recordId: 'BM-DEMO-001' }),
    });
    if (postRes.ok) {
      const json = await postRes.json();
      console.log(`✅ [${postRes.status} OK] POST /api/verify (Returned land: ${json.record?.id})`);
    } else {
      console.error(`❌ [${postRes.status}] POST /api/verify`);
      failures++;
    }
  } catch (err) {
    console.error(`❌ POST /api/verify failed: ${err.message}`);
    failures++;
  }

  // Also test POST /api/qr-verify
  try {
    const qrRes = await fetch('http://localhost:3000/api/qr-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'BM-DEMO-000001' }),
    });
    if (qrRes.ok) {
      const json = await qrRes.json();
      if (json.recordFound && json.isValidSignature === false) {
        console.log(`✅ [${qrRes.status} OK] POST /api/qr-verify (Record found; unsigned demo)`);
      } else {
        console.error('❌ QR verification returned an unexpected record/signature status');
        failures++;
      }
    } else {
      console.error(`❌ [${qrRes.status}] POST /api/qr-verify`);
      failures++;
    }
  } catch (err) {
    console.error(`❌ POST /api/qr-verify failed: ${err.message}`);
    failures++;
  }

  try {
    const qrRes = await fetch('http://localhost:3000/api/qr-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'BM-UNKNOWN-9999' }),
    });
    const json = await qrRes.json();
    if (qrRes.ok && !json.recordFound && json.isValidSignature === false) {
      console.log(`✅ [${qrRes.status} OK] POST /api/qr-verify rejects unknown code`);
    } else {
      console.error(`❌ [${qrRes.status}] POST /api/qr-verify accepted an unknown code`);
      failures++;
    }
  } catch (err) {
    console.error(`❌ Unknown QR code test failed: ${err.message}`);
    failures++;
  }

  console.log(`\nFinished route testing: ${routes.length + 3 - failures} passed, ${failures} failed.`);
  if (failures > 0) process.exit(1);
}

testRoutes();
