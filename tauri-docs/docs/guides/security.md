# Security

This page is designed to explain the high-level concepts and security features at the core of Tauri’s design and ecosystem that make you, your applications and your users more secure by default.

It also includes advice on best practices, how to report vulnerabilities to us and references to detailed concept explanations.

## [Trust Boundaries](#trust-boundaries)

[Section titled “Trust Boundaries”](#trust-boundaries)

> Trust boundary is a term used in computer science and security which describes a boundary where program data or execution changes its level of “trust,” or where two principals with different capabilities exchange data or commands. [1](#user-content-fn-wikipedia-trust-boundary)

Tauri’s security model differentiates between Rust code written for the application’s core and frontend code written in any framework or language understood by the system WebView.

Inspecting and strongly defining all data passed between boundaries is very important to prevent trust boundary violations. If data is passed without access control between these boundaries then it’s easy for attackers to elevate and abuse privileges.

The [IPC layer](/concept/inter-process-communication/) is the bridge for communication between these two trust groups and ensures that boundaries are not broken.

![IPC Diagram](/_astro/tauri-trust-boundaries.C0cC9LAT_ZQ2YYs.svg)

Any code executed by the plugins or the application core has full access to all available system resources and is not constrained.

Any code executed in the WebView has only access to exposed system resources via the well-defined IPC layer. Access to core application commands is configured and restricted by capabilities defined in the application configuration. The individual command implementations enforce the optional fine-grained access levels also defined in the capabilities configuration.

Learn more about the individual components and boundary enforcement:

[ Permissions ](/security/permissions/)

[ Scopes ](/security/scope/)

[ Capabilities ](/security/capabilities/)

[ Runtime Authority ](/security/runtime-authority/)

Tauri allows developers to choose their own frontend stack and framework. This means that we cannot provide a hardening guide for every frontend stack of of choice, but Tauri provides generic features to control and contain the attack surface.

[ Content Security Policy (CSP) ](/security/csp/)

[ Isolation Pattern ](/concept/inter-process-communication/isolation/)

## [(Not) Bundling WebViews](#not-bundling-webviews)

[Section titled “(Not) Bundling WebViews”](#not-bundling-webviews)

Tauri’s approach is to rely on the operating system WebView and not bundling the WebView into the application binary.

This has a multitide of reasons but from a security perspective the most important reason is the average time it takes from publication of a security patched version of a WebView to being rolled out to the application end user.

![IPC Diagram](/_astro/tauri-update-lag.U0zyYit2_Z1SHq3a.svg)

We have observed that WebView packet maintainer and operating system packet maintainers are in average significantly faster to patch and roll out security patched Webview releases than application developers who bundle the WebView directly with their application.

There are exceptions from this observation and in theory both paths can be taken in a similar time frame but this involves a larger overhead infrastructure for each application.

Bundling has it’s drawbacks from a Tauri application developer experience and we do not think it is inherently insecure but the current design is a trade off that significantly reduces known vulnerabilities in the wild.

## [Ecosystem](#ecosystem)

[Section titled “Ecosystem”](#ecosystem)

The Tauri organization provides and maintains more than just the Tauri repository, and to ensure we provide a reasonable secure multi platform application framework, we make sure to go some extra miles.

To learn more about how we secure our development process, what you could adapt and implement, what known threats your application can face and what we plan to improve or harden in the future, you can check out the following documents:

[ Ecosystem Security ](/security/ecosystem/)

[ Application Lifecycle Threats ](/security/lifecycle/)

[ Future Work ](/security/future/)

## [Coordinated Disclosure](#coordinated-disclosure)

[Section titled “Coordinated Disclosure”](#coordinated-disclosure)

If you feel that there is a security concern or issue with anything in Tauri or other repositories in our organization, **please do not publicly comment on your findings**. Instead, reach out directly to our security team.

The preferred disclosure method is via [Github Vulnerability Disclosure](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability#privately-reporting-a-security-vulnerability) on the affected repository. Most of our repositories have this feature enabled but if in doubt please submit via the [Tauri repository](https://github.com/tauri-apps/tauri/security/advisories/new).

Alternatively you can contact us via email at: [security@tauri.app](mailto:security@tauri.app).

Although we do not currently have a budget for security bounties, in some cases, we will consider rewarding coordinated disclosure with our limited resources.

## [Footnotes](#footnote-label)

[Section titled “Footnotes”](#footnote-label)

  1. <https://en.wikipedia.org/wiki/Trust_boundary>. [↩](#user-content-fnref-wikipedia-trust-boundary)


* * *

[Support on Open Collective](https://opencollective.com/tauri) [Sponsor on GitHub](https://github.com/sponsors/tauri-apps)

© 2025 Tauri Contributors. CC-BY / MIT


---

**Source:** [https://v2.tauri.app/security](https://v2.tauri.app/security)