import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
            <Header />
            <main className="flex-1 py-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    <div className="policy-preview-container">
                        <div className="policy-content">
                            <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
                            <div className="text-sm text-zinc-500 mb-8">
                                <p>Effective date: March 09, 2026</p>
                                <p>Last updated: March 09, 2026</p>
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">What are cookies?</h2>
                            <div className="text-zinc-600 dark:text-zinc-400 space-y-4 mb-8">
                                <p>This Cookie Policy explains what cookies are, how we use them, the types of cookies we use (i.e., the information we collect using cookies and how that information is used), and how to manage your cookie settings.</p>
                                <p>Cookies are small text files used to store small pieces of information. They are stored on your device when a website loads in your browser. These cookies help ensure that the website functions properly, enhance security, provide a better user experience, and analyse performance to identify what works and where improvements are needed.</p>
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">How do we use cookies?</h2>
                            <div className="text-zinc-600 dark:text-zinc-400 space-y-4 mb-8">
                                <p>Like most online services, our website uses both first-party and third-party cookies for various purposes. First-party cookies are primarily necessary for the website to function properly and do not collect any personally identifiable data.</p>
                                <p>The third-party cookies used on our website primarily help us understand how the website performs, track how you interact with it, keep our services secure, deliver relevant advertisements, and enhance your overall user experience while improving the speed of your future interactions with our website.</p>
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">Types of cookies we use</h2>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                .cky-table-wrapper{width: 100%; max-width: 100%; overflow: auto;}
                .cky-cookie-audit-table{font-family: inherit; border-collapse: collapse; width: 100%; margin-top: 10px;}
                .cky-cookie-audit-table th{background-color: #f4f4f5; border: 1px solid #e4e4e7; dark:background-color: #27272a; dark:border-color: #3f3f46;}
                .cky-cookie-audit-table td{border: 1px solid #e4e4e7; dark:border-color: #3f3f46;}
                .cky-cookie-audit-table th,.cky-cookie-audit-table td{text-align: left; padding: 10px; font-size: 12px; word-break: normal;}
                .cky-cookie-audit-table td p{font-size: 12px; line-height: 24px; margin-bottom: 1em;}
                .cky-cookie-audit-table td p:last-child{margin-bottom: 0;}
                .cky-cookie-audit-table tr:nth-child(2n + 1) td{background: #fafafa; dark:background: #18181b;}
                .cky-cookie-audit-table tr:nth-child(2n) td{background: #FFFFFF; dark:background: #09090b;}
                .cky-audit-table-element h3{margin: 35px 0 16px 0;}
                .cky-audit-table-element .cky-table-wrapper{margin-bottom: 1rem;}
                .cky-audit-table-element .cky-category-des p{margin-top: 0;}
                .dark .cky-cookie-audit-table th { background-color: #27272a; border-color: #3f3f46; color: #f4f4f5; }
                .dark .cky-cookie-audit-table td { border-color: #3f3f46; color: #d4d4d8; }
                `
                            }} />

                            <div className="cky-audit-table-element mt-6">
                                <div className="mb-8">
                                    <p className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                                        Necessary
                                    </p>
                                    <div className="cky-category-des text-zinc-600 dark:text-zinc-400 mb-4">
                                        <p>Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.</p>
                                    </div>
                                    <div className="cky-table-wrapper">
                                        <table className="cky-cookie-audit-table">
                                            <thead>
                                                <tr>
                                                    <th>Cookie</th>
                                                    <th>Duration</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>cookieyes-consent</td>
                                                    <td>1 year</td>
                                                    <td>CookieYes sets this cookie to remember users&apos; consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                                        Analytics
                                    </p>
                                    <div className="cky-category-des text-zinc-600 dark:text-zinc-400 mb-4">
                                        <p>Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.</p>
                                    </div>
                                    <div className="cky-table-wrapper">
                                        <table className="cky-cookie-audit-table">
                                            <thead>
                                                <tr>
                                                    <th>Cookie</th>
                                                    <th>Duration</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>_clck</td>
                                                    <td>1 year</td>
                                                    <td>Microsoft Clarity sets this cookie to retain the browser&apos;s Clarity User ID and settings exclusive to that website. This guarantees that actions taken during subsequent visits to the same website will be linked to the same user ID.</td>
                                                </tr>
                                                <tr>
                                                    <td>_clsk</td>
                                                    <td>1 day</td>
                                                    <td>Microsoft Clarity sets this cookie to store and consolidate a user&apos;s pageviews into a single session recording.</td>
                                                </tr>
                                                <tr>
                                                    <td>_ga</td>
                                                    <td>1 year 1 month 4 days</td>
                                                    <td>Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site&apos;s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.</td>
                                                </tr>
                                                <tr>
                                                    <td>_ga_*</td>
                                                    <td>1 year 1 month 4 days</td>
                                                    <td>Google Analytics sets this cookie to store and count page views.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">Manage cookie preferences</h2>
                            <div className="text-zinc-600 dark:text-zinc-400 space-y-4">
                                <p>You can modify your cookie settings anytime by clicking the &apos;Consent Preferences&apos; button below. This will allow you to revisit the cookie consent banner and update your preferences or withdraw your consent immediately.</p>
                                <p>Additionally, different browsers offer various methods to block and delete cookies used by websites. You can adjust your browser settings to block or delete cookies. Below are links to support documents on how to manage and delete cookies in major web browsers.</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Chrome: <a target="_blank" rel="noopener noreferrer" href="https://support.google.com/accounts/answer/32050" className="text-indigo-600 hover:underline">https://support.google.com/accounts/answer/32050</a></li>
                                    <li>Safari: <a target="_blank" rel="noopener noreferrer" href="https://support.apple.com/en-in/guide/safari/sfri11471/mac" className="text-indigo-600 hover:underline">https://support.apple.com/en-in/guide/safari/sfri11471/mac</a></li>
                                    <li>Firefox: <a target="_blank" rel="noopener noreferrer" href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&amp;redirectlocale=en-US" className="text-indigo-600 hover:underline">https://support.mozilla.org/en-US/kb/...</a></li>
                                    <li>Internet Explorer: <a target="_blank" rel="noopener noreferrer" href="https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc" className="text-indigo-600 hover:underline">https://support.microsoft.com/en-us/topic/...</a></li>
                                </ul>
                                <p>If you are using a different web browser, please refer to its official support documentation.</p>
                            </div>

                            <p className="text-xs text-zinc-500 mt-12">
                                Cookie Policy generated by <a target="_blank" rel="noopener noreferrer" href="https://www.cookieyes.com/?utm_source=CP&amp;utm_medium=footer&amp;utm_campaign=UW" className="hover:underline">CookieYes - Cookie Policy Generator</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
