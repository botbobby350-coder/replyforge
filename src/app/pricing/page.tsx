export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Try it out',
      features: ['3 emails/month', 'Basic personalization', 'Copy to clipboard'],
      cta: 'Start Free',
      href: '/',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For founders & SDRs',
      features: [
        'Unlimited emails',
        'Advanced AI personalization',
        'LinkedIn + website scraping',
        'Priority generation speed',
        'Email history',
      ],
      cta: 'Get Pro',
      href: '/api/checkout',
      highlight: true,
    },
    {
      name: 'Team',
      price: '$79',
      period: '/month',
      description: 'For sales teams',
      features: [
        'Everything in Pro',
        '5 team seats',
        'Shared email history',
        'Team analytics',
        'Priority support',
      ],
      cta: 'Get Team',
      href: '/api/checkout?plan=team',
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold">ReplyForge</span>
        </a>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, honest pricing</h1>
        <p className="text-gray-400 text-lg mb-12">Start free. Upgrade when you're ready.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 text-left border ${
                plan.highlight
                  ? 'bg-indigo-600/10 border-indigo-500'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
                  Most Popular
                </div>
              )}
              <div className="text-xl font-bold mb-1">{plan.name}</div>
              <div className="text-gray-400 text-sm mb-4">{plan.description}</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-indigo-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`block text-center py-3 rounded-lg font-semibold text-sm transition ${
                  plan.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
