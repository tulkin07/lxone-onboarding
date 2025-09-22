import React from "react"

export default function Privacy() {
  return (
    <main id="main-content" className="mx-auto mb-10 mt-10 max-w-5xl">
      <div className="min-h-screen bg-gray-50 px-3">
        <div className="space-y-6 rounded-xl bg-white shadow-sm md:p-12 px-3 py-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Lxone - Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 ">
            Last Updated: December 24, 2024
          </p>

          <p className="text-gray-700 text-sm">
            This Privacy Policy describes how <strong>Lxone</strong> ("we,"
            "our," or "us") collects, uses, and shares your personal information
            when you use our mobile application ("App").
          </p>

          {/* Mobile App Section */}
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Information We Collect for Mobile App (Driver App)
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="text-sm">
                <strong>Usage Data:</strong> Collected automatically when using
                the Service. Usage Data may include information such as Your
                Device's Internet Protocol address (e.g. IP address), browser
                type, browser version, the pages of our Service that You visit,
                the time and date of Your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data. When You
                access the Service by or through a mobile device, We may collect
                certain information automatically, including, but not limited
                to, the type of mobile device You use, Your mobile device unique
                ID, the IP address of Your mobile device, Your mobile operating
                system, the type of mobile Internet browser You use, unique
                device identifiers and other diagnostic data. We may also
                collect information that Your browser sends whenever You visit
                our Service or when You access the Service by or through a
                mobile device.
              </p>
              <p className="text-sm">
                No mobile information will be shared with third
                parties/affiliates for marketing/promotional purposes. All other
                categories exclude text messaging originator opt-in data and
                consent; this information will not be shared with any third
                parties.
              </p>
              <h2 className="mb-2 text-base font-semibold text-gray-900">
                Information You Provide to Us
              </h2>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Account information (name, email, phone)</li>
                <li>Profile information</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          {/* Web App Section */}
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Information Automatically Collected
            </h2>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Device information (device type, operating system)</li>
              <li>Log data and usage statistics</li>
              <li>Location information (with your permission)</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Information We Collect for Web App (Dispatch App)
            </h2>
            <p className="text-gray-700 text-sm">
              For our Dispatch Web App, we collect the following information:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>User information (account details, contact information)</li>
              <li>
                Driver information (profiles, contact details, certification
                data)
              </li>
              <li>
                Vehicle information (registration details, technical
                specifications)
              </li>
              <li>
                Load information (cargo details, routing information, delivery
                requirements)
              </li>
              <li>
                Google OAuth data (when you use Google to sign in, we receive
                information from your Google account including email address,
                profile information, and email messages)
              </li>
            </ul>
          </section>

          {/* Google Integration */}
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Google Services Integration and Data Access (Dispatch App)
            </h2>
            <p className="text-gray-700 text-sm">
              By using our Google OAuth integration, you authorize Lxone to
              access your Google account for the following purposes:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Reading and processing emails from your Gmail account</li>
              <li>Sending emails on your behalf through your Gmail account</li>
              <li>Marking emails as read in your Gmail account</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <p className="mb-2 text-gray-700 text-sm">Data Access and Usage:</p>
            <p className="text-gray-700 text-sm">
              We will only access and process emails that are relevant to the
              parsing of cargo information from brokers, sending email
              communications to brokers, as well as parsing broker responses and
              displaying notifications on the Lxone platform. Your email data
              will be handled in accordance with our Privacy Policy and Google's
              data usage requirements.
            </p>
          </section>

          {/* How We Use */}
          <section>
            <p className="mb-2 text-gray-700 text-sm">Authorization Management:</p>
            <p className="text-gray-700 text-sm">
              You can revoke Lxone's access to your Google account at any time
              through your Google Account settings. Please note that revoking
              access may limit certain features of our service that rely on
              email communication.
            </p>
          </section>
          <section>
            <p className="mb-2 text-gray-700 text-sm">Security Measures:</p>
            <p className="text-gray-700 text-sm">
              We implement strict security measures to protect your Google
              account data and will never share your access credentials with
              third parties. All data access is encrypted and follows Google's
              security best practices.
            </p>
          </section>
          <section>
            <p className="mb-2 text-gray-700 text-sm">Scope of Access:</p>
            <p className="text-gray-700 text-sm">
              Our access is limited to email-related functions necessary for
              service delivery. We do not access or store any other Google
              services or data from your account.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 text-sm">
              We use the collected information to:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Provide and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates and services</li>
              <li>Ensure the security of our App</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700">We may share your information with:</p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Data Security
            </h2>
            <p className="text-gray-700 text-sm">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Your Rights
            </h2>
            <p className="text-gray-700 text-sm">You have the right to:</p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Children's Privacy
            </h2>
            <p className="text-gray-700 text-sm">
              Our App is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 text-sm">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              Contact Us
            </h2>
            <p className="text-gray-700 text-sm">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul className="list-inside list-disc space-y-1 text-gray-700 text-sm">
              <li>Email: info@altek.uz</li>
              <li>Phone: +998 (33) 330-4774</li>
              <li>Address: Tashkent city, Zarkent 1st passage, 20/1</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="text-gray-700 mt-2 text-sm">
              By using the Lxone App, you agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
