import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
    </div>
  );
}

function ContactHero() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-blue-700/80 to-transparent w-full" />
      
      <div className="relative h-full w-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">Let's Start a Conversation</h1>
          <p className="text-xl text-blue-50 mb-8">
            Have questions about our organic products? We're here to help bring fresh, sustainable produce to your table.
          </p>
          <div className="flex items-center gap-4 text-blue-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <div className="w-full px-6 sm:px-6 lg:px-14 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        <div className="lg:pl-16 lg:border-l border-gray-200">
          <div className="sticky top-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Feel free to reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">Mon-Fri from 8am to 5pm</p>
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">Our friendly team is here to help.</p>
                  <a href="mailto:contact@example.com" className="text-blue-600 hover:text-blue-700">
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Office</h4>
                  <p className="text-gray-600">Come say hello at our office.</p>
                  <p className="text-blue-600">123 Sample Street, City, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}