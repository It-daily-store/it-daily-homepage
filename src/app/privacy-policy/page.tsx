import { Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}

      <section className="bg-pure-black/90 py-8 text-white sm:py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            How we collect, use, and protect your information
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto space-y-4 px-3 py-3 sm:space-y-8 sm:py-5">
        {/* Information Collection */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Information Collection and Use
          </h2>
          <p className="text-dark-gray leading-relaxed">
            Gadget Grid is committed to protecting your privacy. We collect
            information to provide better services to our customers. The
            information we collect includes your name, email address, phone
            number, shipping address, and payment details when you make a
            purchase. We use this information to process orders, provide
            customer support, and improve our services.
          </p>
          <p className="text-dark-gray mt-4 leading-relaxed">
            We also collect information about your browsing behavior to
            personalize your shopping experience and recommend products that
            might interest you. Your personal information remains confidential
            and is never shared with unauthorized third parties.
          </p>
        </section>

        {/* Account Registration */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Account Registration
          </h2>
          <p className="text-dark-gray leading-relaxed">
            When you create an account with Gadget Grid, you provide us with
            personal information including your name, email address, and contact
            details. This information is used to manage your account, process
            orders, and provide personalized customer service. You can update
            your account information at any time through your account dashboard.
          </p>
        </section>

        {/* Order Processing */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Order Processing
          </h2>
          <p className="text-dark-gray leading-relaxed">
            During the checkout process, we collect payment information, billing
            address, and shipping details to fulfill your order. This
            information is securely processed through encrypted connections and
            stored in compliance with industry standards. We may contact you
            regarding your order status, shipping updates, or if we need
            additional information to complete your purchase.
          </p>
        </section>

        {/* Cookies Policy */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Cookies and Tracking
          </h2>
          <p className="text-dark-gray leading-relaxed">
            We use cookies to enhance your browsing experience and analyze
            website traffic. Cookies help us remember your preferences, keep
            items in your shopping cart, and provide personalized
            recommendations. You can control cookie settings through your
            browser, but disabling cookies may limit some website functionality.
          </p>
        </section>

        {/* Data Security */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Data Security
          </h2>
          <p className="text-dark-gray leading-relaxed">
            Gadget Grid implements robust security measures to protect your
            personal information. We use SSL encryption for data transmission,
            secure servers for data storage, and regular security audits to
            ensure your information remains safe. Our team is trained in data
            protection best practices and follows strict protocols for handling
            customer information.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Third-Party Links
          </h2>
          <p className="text-dark-gray leading-relaxed">
            Our website may contain links to third-party websites. Please note
            that Gadget Grid is not responsible for the privacy practices of
            these external sites. We encourage you to read the privacy policies
            of any website you visit through our links.
          </p>
        </section>

        {/* Data Rights */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Your Data Rights
          </h2>
          <p className="text-dark-gray leading-relaxed">
            You have the right to access, update, or delete your personal
            information. You can manage your account settings, unsubscribe from
            marketing communications, or request data deletion by contacting our
            customer service team. We will respond to your requests within a
            reasonable timeframe and in accordance with applicable laws.
          </p>
        </section>

        {/* Updates to Policy */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Policy Updates
          </h2>
          <p className="text-dark-gray leading-relaxed">
            We may update this privacy policy from time to time to reflect
            changes in our practices or legal requirements. When we make
            significant changes, we will notify you through email or by posting
            a notice on our website. Your continued use of our services after
            such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-xl font-semibold">
            Contact Us
          </h2>
          <p className="text-dark-gray mb-6 leading-relaxed">
            If you have any questions about this privacy policy or our data
            practices, please contact us:
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-2 font-semibold text-black">By Email</h3>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Mail className="h-4 w-4" />
                <span>info@gadgetgrid.com</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="mb-2 font-semibold text-black">By Phone</h3>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Phone className="h-4 w-4" />
                <span>(+88) 01234567890</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="mb-2 font-semibold text-black">Visit Us</h3>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <MapPin className="h-4 w-4" />
                <span>Find Our Store Locations</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
