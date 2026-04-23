import Link from 'next/link';

const faqs = [
  {
    category: 'General',
    questions: [
      { q: "How fast can I get a driver?", a: "Most local Phoenix bids are accepted and dispatched within 30–60 minutes." },
      { q: "What areas do you serve?", a: "We currently cover the entire Phoenix Metro area, including Scottsdale, Tempe, Mesa, Chandler, and Glendale." }
    ]
  },
  {
    category: 'For Customers',
    questions: [
      { q: "How do I book a medical run?", a: "Use the 'Book Gig' portal and select 'Medical Courier (STAT)'. Ensure you check the HIPAA sensitivity box." },
      { q: "Is my data HIPAA compliant?", a: "Yes. All jobs flagged as medical are handled by HIPAA-certified drivers and stored in secure Notion fields." }
    ]
  },
  {
    category: 'For Drivers',
    questions: [
      { q: "How do I get paid?", a: "Payouts are processed weekly via Stripe direct deposit based on your accepted and completed bids." },
      { q: "What vehicles qualify?", a: "We accept everything from Sedans for lab runs to Box Trucks for large-scale equipment moves. Vehicle verification is required." }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="container" style={{ paddingTop: '10rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        Frequently Asked <span style={{ color: 'var(--valley-gold)' }}>Questions</span>
      </h1>

      <div style={{ display: 'grid', gap: '4rem', maxWidth: '900px', margin: '0 auto' }}>
        {faqs.map((cat, i) => (
          <div key={i}>
            <h2 className="brand-font" style={{ color: 'var(--valley-gold)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(245,179,1,0.2)', paddingBottom: '0.5rem' }}>
              {cat.category.toUpperCase()}
            </h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {cat.questions.map((item, j) => (
                <div key={j} className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{item.q}</h3>
                  <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', textAlign: 'center', padding: '4rem', background: 'rgba(255,191,0,0.05)', borderRadius: '2rem' }}>
        <h3>Still have questions?</h3>
        <p style={{ margin: '1rem 0 2rem', opacity: 0.6 }}>Our dispatch team is available 24/7 to assist with complex logistics.</p>
        <Link href="/contact" className="btn btn-primary">Contact Support</Link>
      </div>
    </div>
  );
}
