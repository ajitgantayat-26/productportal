import { useMemo, useState } from "react";

const products = [
  { id: "PRD-1001", name: "Everyday Backpack", category: "Accessories", price: 64.0, quantity: 128, mark: "EB", color: "lavender" },
  { id: "PRD-1002", name: "Ceramic Travel Mug", category: "Home & Living", price: 28.5, quantity: 86, mark: "CM", color: "peach" },
  { id: "PRD-1003", name: "Wireless Headphones", category: "Electronics", price: 149.0, quantity: 42, mark: "WH", color: "mint" },
  { id: "PRD-1004", name: "Linen Desk Mat", category: "Workspace", price: 39.95, quantity: 17, mark: "DM", color: "blue" },
  { id: "PRD-1005", name: "Insulated Water Bottle", category: "Accessories", price: 32.0, quantity: 0, mark: "WB", color: "yellow" },
  { id: "PRD-1006", name: "Softcover Notebook Set", category: "Workspace", price: 18.0, quantity: 204, mark: "NS", color: "rose" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (email.trim() && password) onLogin(email.trim());
  }

  return (
    <main className="login-layout">
      <section className="login-card">
        <div className="brand-lockup">
          <span className="brand-mark">P</span>
          <span>form & field</span>
        </div>
        <div className="login-copy">
          <p className="eyebrow">YOUR WORKSPACE, AT A GLANCE</p>
          <h1>Welcome back.</h1>
          <p className="muted">Sign in to manage your products and inventory.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
          <div className="password-label">
            <label htmlFor="password">Password</label>
            <span className="muted">Any password for demo</span>
          </div>
          <input
            autoComplete="current-password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            type="password"
            value={password}
          />
          <button className="primary-button login-button" type="submit">
            Sign in <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="login-note">Demo sign-in only. Use any valid email and a non-empty password.</p>
      </section>
      <aside className="login-art">
        <div className="art-shape art-shape-one" />
        <div className="art-shape art-shape-two" />
        <div className="art-content">
          <span className="art-kicker">A LITTLE MORE IN CONTROL</span>
          <p>Good things are<br />in stock.</p>
          <span className="art-caption">Thoughtful tools for the way you work.</span>
        </div>
        <div className="art-footer"><span>PRODUCTS</span><span>INVENTORY</span><span>INSIGHTS</span></div>
      </aside>
    </main>
  );
}

function ProductPage({ email, onLogout }) {
  const [query, setQuery] = useState("");
  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const totalUnits = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStock = products.filter((product) => product.quantity > 0 && product.quantity < 20).length;
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand-lockup sidebar-brand" href="#products" aria-label="Form and Field home">
          <span className="brand-mark">P</span>
          <span>form & field</span>
        </a>
        <p className="nav-heading">WORKSPACE</p>
        <a className="nav-item active" href="#products"><span className="nav-icon">▦</span> Products</a>
        <a className="nav-item" href="#inventory"><span className="nav-icon">◫</span> Inventory</a>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">✳</span>
            <strong>Need a hand?</strong>
            <span>We're here to help you stay on top of it all.</span>
            <a href="mailto:hello@example.com">Get in touch <span aria-hidden="true">↗</span></a>
          </div>
          <button className="profile-button" onClick={onLogout} type="button" title="Sign out">
            <span className="avatar">{email.charAt(0).toUpperCase()}</span>
            <span className="profile-details"><strong>{email.split("@")[0]}</strong><span>Workspace owner</span></span>
            <span className="profile-menu" aria-hidden="true">···</span>
          </button>
        </div>
      </aside>

      <main className="main-content" id="products">
        <header className="topbar">
          <span className="breadcrumb">Workspace <span>/</span> Products</span>
          <div className="topbar-actions"><span className="status-dot" /> All systems operational <span className="topbar-divider" /> <span className="date-label">{today}</span></div>
        </header>
        <section className="page-heading">
          <div>
            <p className="eyebrow">YOUR CATALOG</p>
            <h1>Products <span className="count-badge">{products.length}</span></h1>
            <p className="muted">A clear view of everything you have in stock.</p>
          </div>
          <button className="primary-button add-button" type="button" onClick={() => window.alert("Product creation is not connected in this demo.")}>
            <span aria-hidden="true">＋</span> Add product
          </button>
        </section>

        <section className="stat-grid" aria-label="Inventory summary">
          <article className="stat-card">
            <div className="stat-label">Total products <span className="stat-symbol">▦</span></div>
            <strong>{products.length.toString().padStart(2, "0")}</strong>
            <span className="stat-caption">Across your catalog</span>
          </article>
          <article className="stat-card">
            <div className="stat-label">Units in stock <span className="stat-symbol">◫</span></div>
            <strong>{totalUnits.toLocaleString()}</strong>
            <span className="stat-caption">Ready to be shipped</span>
          </article>
          <article className="stat-card">
            <div className="stat-label">Low stock <span className="stat-symbol warning-symbol">!</span></div>
            <strong>{lowStock.toString().padStart(2, "0")}</strong>
            <span className="stat-caption">Products need a restock</span>
          </article>
        </section>

        <section className="products-panel" id="inventory">
          <div className="panel-heading">
            <div><h2>All products</h2><p className="muted">Keep track of your product details and stock.</p></div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Search products" onChange={(event) => setQuery(event.target.value)} placeholder="Search products" value={query} />
              <kbd>⌘ K</kbd>
            </label>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>PRODUCT NAME</th><th>PRODUCT ID</th><th>PRICE</th><th>QUANTITY</th><th>STATUS</th></tr></thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td><div className="product-cell"><span className={`product-mark ${product.color}`}>{product.mark}</span><span><strong>{product.name}</strong><small>{product.category}</small></span></div></td>
                    <td className="id-cell">{product.id}</td>
                    <td className="price-cell">{currency.format(product.price)}</td>
                    <td>{product.quantity} <span className="unit-label">units</span></td>
                    <td>{product.quantity === 0 ? <span className="pill out-of-stock">Out of stock</span> : product.quantity < 20 ? <span className="pill low-stock">Low stock</span> : <span className="pill in-stock">In stock</span>}</td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && <tr><td className="empty-state" colSpan="5">No products match “{query}”.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="table-footer"><span>Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products</span><span className="updated-label"><span className="status-dot" /> Inventory up to date</span></footer>
        </section>
        <footer className="page-footer"><span>© {new Date().getFullYear()} Form & Field</span><span>Made for the details that matter.</span></footer>
      </main>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");

  return email ? <ProductPage email={email} onLogout={() => setEmail("")} /> : <Login onLogin={setEmail} />;
}
