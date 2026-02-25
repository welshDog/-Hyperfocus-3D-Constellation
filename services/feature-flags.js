export function getGatewayVariant() {
  const params = new URLSearchParams(window.location.search);
  const flag = params.get('gateway');
  if (flag === 'on') return { useGateway: true, variant: 'gateway' };
  if (flag === 'off') return { useGateway: false, variant: 'static' };
  const persisted = localStorage.getItem('gateway-variant');
  if (persisted) return JSON.parse(persisted);
  const bucket = Math.random() < 0.1 ? 'gateway' : 'static';
  const variant = { useGateway: bucket === 'gateway', variant: bucket };
  localStorage.setItem('gateway-variant', JSON.stringify(variant));
  return variant;
}
