import { authService } from '../src/services/authService';

async function testAuth() {
  try {
    console.log('Testing authentication...');
    
    // Test login with superadmin
    console.log('\nTesting superadmin login...');
    const user = await authService.login('info@cleaningelements.com', 'CO2020sol@');
    console.log('Login successful:', user);

  } catch (error) {
    console.error('Authentication test failed:', error);
  }
}

testAuth().catch(console.error);