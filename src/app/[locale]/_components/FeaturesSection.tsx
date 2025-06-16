import { ArrowRight, CheckCircle, Globe, ShieldCheck, Store, Wallet } from "lucide-react"


const FeaturesSection = () => {
  return (
            <section className="py-16 relative px-4">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(22,163,74,0.1),rgba(0,0,0,0)_50%)]" />
              </div>
              
              <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Arabic-First Interface</h3>
                    <p className="text-muted-foreground">
                      Built specifically for the Egyptian market with full Arabic language support and right-to-left design considerations.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Local Payment Solutions</h3>
                    <p className="text-muted-foreground">
                      Integrated payment gateways optimized for Egyptian customers, including cash on delivery, mobile wallets, and local card processors.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Customizable Storefronts</h3>
                    <p className="text-muted-foreground">
                      Beautiful, responsive store designs that can be fully customized to match your brand identity without any coding knowledge.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Secure Infrastructure</h3>
                    <p className="text-muted-foreground">
                      Enterprise-grade security to protect your business and customer data, with compliance for local Egyptian regulations.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Egyptian Pound Support</h3>
                    <p className="text-muted-foreground">
                      Full support for EGP currency, with automatic tax calculations and compliance with local financial requirements.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/40 transition-all">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Growth Tools</h3>
                    <p className="text-muted-foreground">
                      Marketing tools optimized for the Egyptian market, including social media integration, SEO features, and local advertising options.
                    </p>
                  </div>
                </div>
              </div>
            </section>
  )
}

export default FeaturesSection