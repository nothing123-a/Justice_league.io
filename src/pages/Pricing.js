import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        'Browse 5 cases/month',
        'Basic profile',
        'Email support',
        'Limited access'
      ]
    },
    {
      name: 'Basic',
      price: 3900,
      popular: true,
      features: [
        'Browse 25 cases/month',
        'Enhanced profile',
        'Priority support',
        'Case analytics',
        'Priority listing'
      ]
    },
    {
      name: 'Premium',
      price: 7900,
      features: [
        'Unlimited cases',
        'Featured profile',
        '24/7 support',
        'Advanced analytics',
        'Direct client contact'
      ]
    }
  ];

  return (
    <div className="pricing-page">
      <div className="page-hero">
        <div className="container">
          <h1>Transparent Pricing</h1>
          <p>Choose the plan that fits your legal practice needs</p>
        </div>
      </div>

      <div className="container">
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'featured' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="price">
                ₹{plan.price}
                <span>/month</span>
              </div>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={plan.popular ? 'btn-primary' : 'btn-outline'}>
                {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;