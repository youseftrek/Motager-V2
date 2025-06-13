import React from 'react';
import { 
  BarChart3, 
  Smartphone, 
  FileText, 
  Package, 
  TrendingUp,
  Database,
  Settings,
  ArrowRight
} from 'lucide-react';

export default function MotagerBusinessCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-700/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-600/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between relative z-10">
          {/* Left side - Person and floating cards */}
          <div className="flex-1 relative">
            {/* Main person container */}
            <div className="relative">
              {/* Background circle */}
              <div className="w-80 h-80 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-full absolute -top-8 -left-8"></div>
              
              {/* Person placeholder */}
              <div className="w-64 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl relative z-10 flex items-center justify-center border border-green-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-white font-semibold">Business Professional</div>
                  <div className="text-green-400 text-sm">Motager Expert</div>
                </div>
              </div>
            </div>

            {/* Floating feature cards */}
            <div className="absolute top-4 -right-8 bg-white rounded-xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Analytics Dashboard</span>
              </div>
            </div>

            <div className="absolute top-32 -right-16 bg-white rounded-xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 font-medium">Mobile App</span>
              </div>
            </div>

            <div className="absolute top-60 -right-12 bg-white rounded-xl p-4 shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 font-medium">B2B Solutions</span>
              </div>
            </div>

            {/* Bottom CTA card */}
          </div>

          {/* Right side - Content */}
          <div className="flex-1 pl-12">
            {/* Motager branding */}
            <div className="flex items-center justify-end mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-white text-2xl font-bold">Motager</span>
              </div>
            </div>

            {/* Main heading */}
            <div className="text-right mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Launch Your Dream Store 
                <span className="text-green-400 block">with Motager</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Expand your business and reduce operational costs with Motager's comprehensive platform. 
                Everything you need to bring your store to life.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-end space-x-4 text-white">
                <span className="text-lg">Flexible payment processing for your business</span>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 text-white">
                <span className="text-lg">Complete inventory and warehouse management</span>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 text-white">
                <span className="text-lg">Global ERP systems integration</span>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-right">
              <button className="bg-green-700 hover:bg-green-800  px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 ml-auto">
                <span>Learn More About Motager</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 left-8 w-1 h-1 bg-green-300 rounded-full animate-pulse delay-75"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
}