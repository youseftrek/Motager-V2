import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Globe, ShieldCheck, Store, Wallet } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
      <div className="min-h-screen text-foreground flex flex-col">
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.15),rgba(0,0,0,0)_50%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">Motager</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Empowering Egyptian entrepreneurs to build thriving online businesses
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-foreground mb-6">
                  At Motager, we're on a mission to revolutionize e-commerce in Egypt by providing local entrepreneurs with powerful, accessible tools to establish and grow their online presence.
                </p>
                <p className="text-foreground">
                  We believe that every business, regardless of size, deserves the opportunity to thrive in the digital marketplace. By removing technical barriers and offering a platform tailored specifically for the Egyptian market, we're empowering the next generation of business owners to reach customers across the country and beyond.
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-primary/10" />
                <Image 
                  src="/images/motager women.png" 
                  alt="Egyptian entrepreneurs using Motager platform" 
                  width={600} 
                  height={600}
                  className="w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(22,163,74,0.1),rgba(0,0,0,0)_50%)]" />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
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
        
        {/* Benefits Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Motager</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cost-Effective Solution</h3>
                      <p className="text-muted-foreground">
                        Affordable pricing plans designed specifically for the Egyptian market, with no hidden fees and transparent pricing.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
                      <p className="text-muted-foreground">
                        Intuitive design that makes it easy for anyone to set up and manage their online store, regardless of technical expertise.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Local Support</h3>
                      <p className="text-muted-foreground">
                        Egyptian-based customer support team that understands the local market and can provide assistance in Arabic and English.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Wider Customer Reach</h3>
                      <p className="text-muted-foreground">
                        Tools to help you reach customers across Egypt and beyond, with features designed to optimize for local search and discovery.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Scalable Platform</h3>
                      <p className="text-muted-foreground">
                        Start small and grow big—our platform scales with your business, from your first sale to your millionth customer.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
                      <p className="text-muted-foreground">
                        Regular updates and new features based on feedback from Egyptian merchants and evolving market needs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Economic Impact Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(22,163,74,0.1),rgba(0,0,0,0)_50%)]" />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Commitment to Egypt</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-primary/10" />
                <Image 
                  src="/images/man-using-motager.png" 
                  alt="Egyptian marketplace" 
                  width={600} 
                  height={600}
                  className="w-full h-auto relative z-10"
                />
              </div>
              
              <div>
                <p className="text-muted-foreground mb-6">
                  Motager is more than just an e-commerce platform—we're committed to fostering economic growth and digital transformation across Egypt.
                </p>
                <p className="text-muted-foreground mb-6">
                  By providing accessible tools for entrepreneurs to establish and grow their online businesses, we're helping to create jobs, support local industries, and contribute to Egypt's digital economy.
                </p>
                <p className="text-muted-foreground">
                  We actively collaborate with local businesses, educational institutions, and government initiatives to promote digital literacy and entrepreneurship throughout Egypt, ensuring that the benefits of e-commerce are accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.2),rgba(0,0,0,0)_50%)]" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your E-commerce Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Egyptian entrepreneurs who are growing their businesses with Motager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View Demo Store
              </Button>
            </div>
          </div>
        </section>
      </div>
  )
}
