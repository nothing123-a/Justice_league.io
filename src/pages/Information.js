import React, { useState } from 'react';

const Information = () => {
  const [activeCategory, setActiveCategory] = useState('ipc');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'ipc', label: 'IPC Sections', icon: 'fas fa-gavel' },
    { id: 'cases', label: 'Case Types', icon: 'fas fa-folder-open' },
    { id: 'courts', label: 'Court System', icon: 'fas fa-university' },
    { id: 'procedures', label: 'Legal Procedures', icon: 'fas fa-list-ol' },
    { id: 'documents', label: 'Documents', icon: 'fas fa-file-alt' }
  ];

  const informationData = {
    ipc: [
      { code: '420', title: 'Cheating', description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property', punishment: 'Imprisonment up to 7 years and fine', bailable: 'Non-bailable' },
      { code: '406', title: 'Criminal Breach of Trust', description: 'Whoever, being in any manner entrusted with property, dishonestly misappropriates or converts to his own use', punishment: 'Imprisonment up to 3 years or fine or both', bailable: 'Bailable' },
      { code: '415', title: 'Cheating', description: 'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived', punishment: 'Imprisonment up to 1 year or fine or both', bailable: 'Bailable' },
      { code: '463', title: 'Forgery', description: 'Whoever makes any false document or false electronic record or part of a document', punishment: 'Imprisonment up to 2 years or fine or both', bailable: 'Bailable' },
      { code: '468', title: 'Forgery for Cheating', description: 'Whoever commits forgery, intending that the document or electronic record forged shall be used for the purpose of cheating', punishment: 'Imprisonment up to 7 years and fine', bailable: 'Non-bailable' }
    ],
    cases: [
      { type: 'Property Dispute', description: 'Conflicts over ownership, boundaries, or rights to real estate', duration: '6 months - 3 years', cost: '₹50,000 - ₹5,00,000', documents: 'Sale deed, title documents, survey records' },
      { type: 'Title Verification', description: 'Legal process to confirm clear ownership of property', duration: '15-30 days', cost: '₹10,000 - ₹50,000', documents: 'Revenue records, encumbrance certificate, NOC' },
      { type: 'Contract Disputes', description: 'Disagreements over terms and execution of legal agreements', duration: '3 months - 2 years', cost: '₹25,000 - ₹3,00,000', documents: 'Original contract, correspondence, evidence' },
      { type: 'Lease Disputes', description: 'Conflicts between landlords and tenants over rental agreements', duration: '2-8 months', cost: '₹15,000 - ₹1,00,000', documents: 'Lease agreement, rent receipts, notices' },
      { type: 'RERA Complaints', description: 'Consumer complaints under Real Estate Regulation Act', duration: '60-90 days', cost: '₹5,000 - ₹25,000', documents: 'Sale agreement, payment receipts, project details' }
    ],
    courts: [
      { level: 'District Court', jurisdiction: 'Property disputes up to ₹20 lakhs', appeal: 'High Court', fees: '₹500 - ₹5,000', timeframe: '6 months - 2 years' },
      { level: 'High Court', jurisdiction: 'Appeals from subordinate courts, original jurisdiction for high-value cases', appeal: 'Supreme Court', fees: '₹2,000 - ₹25,000', timeframe: '1-3 years' },
      { level: 'Supreme Court', jurisdiction: 'Final court of appeal, constitutional matters', appeal: 'None', fees: '₹10,000 - ₹1,00,000', timeframe: '2-5 years' },
      { level: 'Consumer Court', jurisdiction: 'Consumer disputes under Consumer Protection Act', appeal: 'Higher Consumer Forum', fees: '₹200 - ₹5,000', timeframe: '3-12 months' },
      { level: 'RERA Authority', jurisdiction: 'Real estate disputes under RERA Act', appeal: 'RERA Appellate Tribunal', fees: '₹1,000 - ₹10,000', timeframe: '60-180 days' }
    ],
    procedures: [
      { procedure: 'Filing a Civil Suit', steps: ['Draft plaint', 'Pay court fees', 'File with court', 'Serve notice', 'Written statement', 'Evidence', 'Arguments', 'Judgment'], duration: '6 months - 2 years', cost: '₹10,000 - ₹1,00,000' },
      { procedure: 'Property Registration', steps: ['Document verification', 'Stamp duty payment', 'Registration fee', 'Biometric verification', 'Document registration', 'Receipt collection'], duration: '1-7 days', cost: '1-8% of property value' },
      { procedure: 'Bail Application', steps: ['File application', 'Attach documents', 'Court hearing', 'Surety arrangement', 'Bail bond execution'], duration: '1-15 days', cost: '₹5,000 - ₹50,000' },
      { procedure: 'Appeal Process', steps: ['File appeal petition', 'Pay court fees', 'Serve notice', 'Counter reply', 'Hearing', 'Judgment'], duration: '1-3 years', cost: '₹15,000 - ₹2,00,000' }
    ],
    documents: [
      { document: 'Sale Deed', purpose: 'Transfer of property ownership', validity: 'Lifetime', cost: '₹500 - ₹2,000', required: 'Property purchase/sale' },
      { document: 'Power of Attorney', purpose: 'Authorize someone to act on your behalf', validity: 'As specified', cost: '₹100 - ₹500', required: 'Legal representation' },
      { document: 'Affidavit', purpose: 'Sworn statement of facts', validity: '6 months - 1 year', cost: '₹50 - ₹200', required: 'Court proceedings' },
      { document: 'NOC (No Objection Certificate)', purpose: 'Clearance from authorities', validity: '6 months - 2 years', cost: '₹200 - ₹1,000', required: 'Property transactions' },
      { document: 'Encumbrance Certificate', purpose: 'Property transaction history', validity: '3 months', cost: '₹25 - ₹100', required: 'Property verification' }
    ]
  };

  const filteredData = informationData[activeCategory]?.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Legal Information Center</h1>
        <p>Comprehensive guide to IPC sections, court procedures, and legal documentation</p>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search legal information..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.categoryTabs}>
        {categories.map(category => (
          <button
            key={category.id}
            style={{
              ...styles.categoryTab,
              ...(activeCategory === category.id ? styles.activeTab : {})
            }}
            onClick={() => setActiveCategory(category.id)}
          >
            <i className={category.icon}></i>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div style={styles.contentArea}>
        {activeCategory === 'ipc' && (
          <div style={styles.ipcSection}>
            <h2>Indian Penal Code Sections</h2>
            <div style={styles.cardsGrid}>
              {filteredData.map((section, index) => (
                <div key={index} style={styles.ipcCard}>
                  <div style={styles.ipcHeader}>
                    <h3>Section {section.code}</h3>
                    <span style={{...styles.badge, backgroundColor: section.bailable === 'Bailable' ? '#3DDC97' : '#e74c3c'}}>
                      {section.bailable}
                    </span>
                  </div>
                  <h4>{section.title}</h4>
                  <p>{section.description}</p>
                  <div style={styles.punishment}>
                    <strong>Punishment:</strong> {section.punishment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'cases' && (
          <div style={styles.casesSection}>
            <h2>Legal Case Types</h2>
            <div style={styles.cardsGrid}>
              {filteredData.map((caseType, index) => (
                <div key={index} style={styles.caseCard}>
                  <h3>{caseType.type}</h3>
                  <p>{caseType.description}</p>
                  <div style={styles.caseDetails}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-clock"></i>
                      <span><strong>Duration:</strong> {caseType.duration}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-rupee-sign"></i>
                      <span><strong>Cost:</strong> {caseType.cost}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-file-alt"></i>
                      <span><strong>Documents:</strong> {caseType.documents}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'courts' && (
          <div style={styles.courtsSection}>
            <h2>Court System Hierarchy</h2>
            <div style={styles.cardsGrid}>
              {filteredData.map((court, index) => (
                <div key={index} style={styles.courtCard}>
                  <h3>{court.level}</h3>
                  <div style={styles.courtDetails}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-gavel"></i>
                      <span><strong>Jurisdiction:</strong> {court.jurisdiction}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-arrow-up"></i>
                      <span><strong>Appeal to:</strong> {court.appeal}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-rupee-sign"></i>
                      <span><strong>Fees:</strong> {court.fees}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-clock"></i>
                      <span><strong>Timeframe:</strong> {court.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'procedures' && (
          <div style={styles.proceduresSection}>
            <h2>Legal Procedures</h2>
            <div style={styles.cardsGrid}>
              {filteredData.map((proc, index) => (
                <div key={index} style={styles.procedureCard}>
                  <h3>{proc.procedure}</h3>
                  <div style={styles.stepsContainer}>
                    <h4>Steps:</h4>
                    <ol style={styles.stepsList}>
                      {proc.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div style={styles.procedureDetails}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-clock"></i>
                      <span><strong>Duration:</strong> {proc.duration}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-rupee-sign"></i>
                      <span><strong>Cost:</strong> {proc.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'documents' && (
          <div style={styles.documentsSection}>
            <h2>Legal Documents</h2>
            <div style={styles.cardsGrid}>
              {filteredData.map((doc, index) => (
                <div key={index} style={styles.documentCard}>
                  <h3>{doc.document}</h3>
                  <p>{doc.purpose}</p>
                  <div style={styles.documentDetails}>
                    <div style={styles.detailItem}>
                      <i className="fas fa-calendar"></i>
                      <span><strong>Validity:</strong> {doc.validity}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-rupee-sign"></i>
                      <span><strong>Cost:</strong> {doc.cost}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <i className="fas fa-check"></i>
                      <span><strong>Required for:</strong> {doc.required}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  searchSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  searchBox: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 20px 12px 50px',
    border: '2px solid #e1e8ed',
    borderRadius: '25px',
    fontSize: '1rem',
    outline: 'none'
  },
  categoryTabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  categoryTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: '2px solid #e1e8ed',
    borderRadius: '25px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: '#2F5DFF',
    color: 'white',
    borderColor: '#2F5DFF'
  },
  contentArea: {
    minHeight: '500px'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '1rem'
  },
  ipcCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  ipcHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  punishment: {
    marginTop: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #2F5DFF'
  },
  caseCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  caseDetails: {
    marginTop: '1rem'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  },
  courtCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  courtDetails: {
    marginTop: '1rem'
  },
  procedureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  stepsContainer: {
    marginTop: '1rem'
  },
  stepsList: {
    paddingLeft: '1.5rem',
    marginTop: '0.5rem'
  },
  procedureDetails: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e1e8ed'
  },
  documentCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  documentDetails: {
    marginTop: '1rem'
  }
};

export default Information;