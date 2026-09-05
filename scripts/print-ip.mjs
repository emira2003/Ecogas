import os from 'os';

function printNetworkLinks() {
  const interfaces = os.networkInterfaces();
  const links = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // Prioritize standard local Wi-Fi / LAN IPs (e.g., 192.168.x.x, 10.x.x.x)
        const isStandardLan = iface.address.startsWith('192.168.') || iface.address.startsWith('10.');
        links.push({ name, address: iface.address, isStandardLan });
      }
    }
  }

  // Sort standard LAN IPs to top
  links.sort((a, b) => (b.isStandardLan ? 1 : 0) - (a.isStandardLan ? 1 : 0));

  console.log('\n' + '─'.repeat(58));
  console.log(' 📱 MOBILE & LOCAL NETWORK ACCESS LINKS');
  console.log('─'.repeat(58));
  console.log(' 💻 Desktop (Localhost):  http://localhost:3000');
  
  if (links.length > 0) {
    console.log('\n 📲 Phone (Ensure phone is on same Wi-Fi / Network):');
    for (const link of links) {
      console.log(`    ➜ http://${link.address}:3000   (${link.name})`);
    }
  } else {
    console.log('    ➜ No active external IPv4 interface found.');
  }
  console.log('─'.repeat(58) + '\n');
}

printNetworkLinks();
