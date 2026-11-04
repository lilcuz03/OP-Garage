import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, {
  type LegalSectionData,
} from "@/components/ui/LegalLayout";
import { legal } from "@/data/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OP Garage & Gate Repairs collects, uses and protects your personal information, in line with South Africa's Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSectionData[] = [
  {
    id: "about",
    title: "About this policy",
    content: (
      <>
        <p>
          {legal.tradingName} respects your privacy. This policy explains what
          personal information we collect through this website and when you
          contact us, how we use it, and what your rights are under the
          Protection of Personal Information Act 4 of 2013 (POPIA).
        </p>
        <p>
          The responsible party for your information is{" "}
          <strong>{legal.tradingName}</strong>
          {legal.informationOfficer && (
            <>
              . Our information officer is{" "}
              <strong>{legal.informationOfficer}</strong>
            </>
          )}
          .
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We only collect information you choose to give us, plus basic
          technical data needed to run the website.
        </p>
        <ul>
          <li>
            <strong>Information you give us:</strong> your name, phone number,
            email address, suburb or address, the service you need and a
            description of the problem, when you contact us by WhatsApp, phone,
            email or the quote form.
          </li>
          <li>
            <strong>Technical data:</strong> our hosting provider may process
            technical data such as your IP address, browser type and the pages
            you request, so the website can be delivered and kept secure.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>respond to your enquiries and give you a quote</li>
          <li>arrange appointments and carry out repairs and installations</li>
          <li>honour warranties and follow up on our work</li>
          <li>keep records we are required to keep by law</li>
        </ul>
        <p>We do not use your information for unrelated purposes.</p>
      </>
    ),
  },
  {
    id: "quote-form-and-whatsapp",
    title: "The quote form and WhatsApp",
    content: (
      <p>
        The quote form on our Contact page does not send your details to our
        servers and does not store them on this website. It prepares a WhatsApp
        message from what you typed and opens WhatsApp. Nothing is sent to us
        until you press send in WhatsApp. Messages are then handled by WhatsApp,
        which has its own privacy policy.
      </p>
    ),
  },
  {
    id: "third-parties-and-cookies",
    title: "Third-party services and cookies",
    content: (
      <>
        <ul>
          <li>
            <strong>Google Maps:</strong> an embedded map shows where we are
            based. When it loads, Google may collect data and set cookies in
            line with its own privacy policy.
          </li>
          <li>
            <strong>Google reviews:</strong> customer reviews may be loaded from
            Google and displayed on our pages.
          </li>
          <li>
            <strong>Hosting:</strong> the website is hosted by Vercel, which
            processes technical data as described above.
          </li>
        </ul>
        <p>
          This website does not set its own tracking or advertising cookies. If
          that changes, we will update this policy.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    content: (
      <p>
        We do not sell your personal information. We share it only with people
        who help us carry out your job or run the business, and where the law
        requires us to.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <p>
        We keep your information only for as long as we need it for the purpose
        you gave it to us, to honour warranties, and to meet our legal
        obligations. After that we delete it or make it anonymous.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We take reasonable steps to protect your information from loss, misuse
        and unauthorised access. No method of transmission or storage is
        completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Under POPIA you have the right to:</p>
        <ul>
          <li>ask what personal information we hold about you</li>
          <li>ask us to correct or delete your information</li>
          <li>object to how we process your information</li>
          <li>withdraw your consent where we rely on it</li>
        </ul>
        <p>
          If you are unhappy with how we handle your information, you can
          complain to the Information Regulator (South Africa) at{" "}
          <a
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
          >
            inforegulator.org.za
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        This website is not aimed at children under 18, and we do not knowingly
        collect their personal information.
      </p>
    ),
  },
  {
    id: "changes-and-contact",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may update this policy from time to time. The date at the top of
          the page shows when it was last changed.
        </p>
        <p>
          To use your rights or ask a question, email us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={site.phoneHref}>{site.phone}</a>. See also our{" "}
          <Link href="/legal-notice">Legal Notice</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      crumb="Privacy Policy"
      title="Privacy Policy"
      intro="What personal information we collect, how we use it, and your rights under POPIA."
      updated={legal.lastUpdated}
      sections={sections}
    />
  );
}
