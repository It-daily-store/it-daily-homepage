import { Mail, Phone, MapPin } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-pure-black/90 py-8 text-white sm:py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            Your rights and responsibilities when using our services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto space-y-4 px-3 py-3 sm:space-y-8 sm:py-5">
        {/* Acceptance of Terms */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Acceptance of Terms
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            By accessing and using Gadget Grid&apos;s website and services, you
            accept and agree to be bound by these Terms and Conditions. If you
            do not agree to these terms, please do not use our website or
            services. These terms apply to all visitors, users, and customers
            who access or use our service.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            We reserve the right to update or modify these terms at any time
            without prior notice. Your continued use of the service after any
            changes constitutes acceptance of those changes.
          </p>
        </section>

        {/* Use of Website */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Website Usage
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            You may use our website for lawful purposes only. You agree not to
            use the site in any way that could damage, disable, overburden, or
            impair our servers or networks. You must not attempt to gain
            unauthorized access to any part of our website, other accounts, or
            computer systems connected to our service.
          </p>
        </section>

        {/* Product Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Product Information & Availability
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            We strive to provide accurate product descriptions, specifications,
            and pricing information. However, we do not warrant that product
            descriptions or other content is accurate, complete, or error-free.
            Product availability is subject to change without notice. We reserve
            the right to limit quantities and discontinue products at any time.
          </p>
        </section>

        {/* Orders and Payment */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Orders & Payment
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            All orders are subject to acceptance and availability. We reserve
            the right to refuse or cancel any order for any reason. Payment must
            be received before order processing. We accept various payment
            methods including credit cards, debit cards, and digital payment
            systems. All prices are subject to change without notice.
          </p>
        </section>

        {/* Shipping and Delivery */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Shipping & Delivery
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Delivery times are estimates and not guaranteed. Gadget Grid is not
            responsible for delays caused by shipping carriers, customs, or
            other factors beyond our control. Risk of loss and title for
            products pass to you upon delivery to the shipping carrier. You are
            responsible for providing accurate shipping information.
          </p>
        </section>

        {/* Returns and Refunds */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Returns & Refunds
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            We offer a 30-day return policy for most products in original
            condition. Items must be returned in original packaging with all
            accessories. Some products may have different return policies due to
            their nature. Refunds will be processed to the original payment
            method within 5-10 business days after we receive and inspect the
            returned item.
          </p>
        </section>

        {/* Warranties */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Warranties & Disclaimers
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Products sold by Gadget Grid come with manufacturer warranties where
            applicable. We provide products &quot;as is&quot; without additional
            warranties beyond those provided by manufacturers. We disclaim all
            implied warranties including merchantability and fitness for a
            particular purpose to the extent permitted by law.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Limitation of Liability
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Gadget Grid&apos;s liability is limited to the purchase price of the
            product. We shall not be liable for any indirect, incidental,
            special, or consequential damages arising from the use of our
            products or services. This limitation applies regardless of the
            legal theory on which the claim is based.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Intellectual Property
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            All content on this website, including text, graphics, logos,
            images, and software, is the property of Gadget Grid or its content
            suppliers and is protected by copyright and other intellectual
            property laws. You may not reproduce, distribute, or create
            derivative works from our content without written permission.
          </p>
        </section>

        {/* Governing Law */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Governing Law
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            These terms and conditions are governed by and construed in
            accordance with the laws of Bangladesh. Any disputes arising from
            these terms or your use of our services will be subject to the
            exclusive jurisdiction of the courts of Bangladesh.
          </p>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Contact Us
          </h2>
          <p className="text-dark-gray mb-6 text-sm leading-relaxed md:text-base">
            If you have any questions about these Terms and Conditions, please
            contact us:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                By Email
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Mail className="h-4 w-4" />
                <span>legal@gadgetgrid.com</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                By Phone
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Phone className="h-4 w-4" />
                <span>(+88) 01234567890</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Visit Us
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
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
