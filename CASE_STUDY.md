# Teleb Furniture — Building a Modern Digital Experience for a Furniture Brand

**Role:** Full-Stack Developer  
**Project:** E-commerce storefront and custom content management system  
**Industry:** Furniture & Home Living  
**Location:** Cairo, Egypt  
**Website:** https://www.teleb-furniture.com/en  
**Focus:** Frontend engineering, backend architecture, internationalization, performance, and admin tooling

---

## 01. Overview

Teleb Furniture is a furniture brand offering products for residential and commercial spaces. The challenge was to build a modern digital experience that presents the brand professionally, makes its collections easier to explore, and gives the business a more practical way to manage its online presence.

I developed the storefront alongside a custom backend and administration dashboard. Rather than relying on a generic website builder or a predefined e-commerce template, I built the system around the project's actual requirements, from product and collection management to promotional banners, offers, and customer inquiries.

The result is a bilingual furniture website supported by a custom content management system, designed to connect the customer-facing experience with the operational tools the business needs behind the scenes.

**The project was not just about building a website. It was about building the system that powers it.**

## 02. The Challenge

Furniture websites have a different set of requirements from many conventional online stores.

Customers often need more than a product name and a photograph. They need to understand the product's appearance, dimensions, materials, available options, and suitability for their space. The browsing experience needs to make the catalog feel organized while giving the brand enough room to communicate its identity.

At the same time, the business needs to keep its content current. Products change, collections evolve, promotions need updating, and customer inquiries must reach the right people.

These requirements shaped the main challenges of the project.

### Presenting furniture as a premium product

Furniture is a visual purchase. Photography, spacing, typography, and layout all influence how customers perceive quality. The interface needed to give products enough visual attention without making navigation or essential information difficult to find.

### Organizing a growing catalog

A furniture catalog can span multiple rooms, use cases, and product types. The website needed a clear category and collection structure so customers could discover relevant products without navigating an unnecessarily complicated interface.

### Supporting Arabic and English

The website needed to accommodate both Arabic-speaking and English-speaking customers. This meant handling more than translated strings: directionality, alignment, layout behavior, typography, and navigation all had to work correctly across both languages.

### Giving the business control

Product updates and promotional changes should not require a developer to edit source code and redeploy the website every time. The business needed an administrative interface connected to the same data used by the storefront.

### Maintaining a coherent technical foundation

The frontend, backend, database, authentication, media handling, and administrative tools needed to work together without introducing unnecessary complexity or making routine maintenance difficult.

## 03. Goals and Success Criteria

I approached the project with five primary goals.

1. **Create a stronger digital storefront.** Establish a polished, responsive experience that reflects the brand and presents its furniture collections clearly.
2. **Make product discovery intuitive.** Organize products and collections around recognizable categories and straightforward navigation.
3. **Deliver a complete bilingual experience.** Support Arabic RTL and English LTR throughout the customer-facing interface.
4. **Build an independent management system.** Allow authorized administrators to manage catalog content, collections, banners, offers, and incoming messages.
5. **Prioritize maintainability and performance.** Use a modern stack with clear separation between the user interface, business logic, data access, and supporting services.

These goals became the basis for the architecture and implementation decisions throughout the project.

## 04. Product Strategy and User Experience

The experience was designed around two distinct users: customers exploring furniture and administrators maintaining the business's online catalog.

### The customer journey

The storefront guides visitors through a straightforward discovery process:

**Discover → Explore → Evaluate → Inquire**

Visitors arrive at the homepage, discover featured collections, browse relevant categories, inspect products, and continue toward the appropriate contact or inquiry action.

Each stage has a different purpose.

- **Discover:** Introduce the brand and communicate its visual identity.
- **Explore:** Provide clear access to categories and collections.
- **Evaluate:** Present product imagery and relevant information in an organized layout.
- **Inquire:** Make it straightforward for interested customers to contact the business.

This approach prioritizes clarity over unnecessary interaction. The interface should help customers understand what is available and what to do next, rather than making them work to discover basic information.

### The administration journey

The second user journey focuses on maintaining the website.

Administrators need to update products, organize collections, publish banners, manage offers, review customer messages, and understand basic business activity from one place.

Instead of treating the dashboard as a separate project, I built it as part of the same product ecosystem. This creates a direct connection between the content administrators manage and the information customers see.

## 05. Visual Design and Brand Presentation

For a furniture brand, the website's visual language needs to support the products rather than compete with them.

I approached the interface with an emphasis on clean layouts, clear hierarchy, product-focused presentation, and responsive behavior. The intention was to create an experience that feels appropriate for a furniture business without relying on excessive decoration or interactions that distract from the catalog.

### Visual hierarchy

A useful hierarchy establishes what deserves attention first.

The homepage introduces the brand and its featured content. Collection and category sections help visitors understand the available range. Product imagery then becomes the focal point during browsing.

Typography, spacing, and consistent component behavior help maintain this hierarchy throughout the site.

### Product-focused presentation

Product imagery is central to furniture discovery. The layout needs to accommodate different image proportions while preserving a consistent browsing experience.

I also treated image delivery as an engineering concern, not just a design decision. Large product photographs can affect initial loading, scrolling performance, and the experience on mobile networks.

### Responsive behavior

The interface was built to accommodate desktop and mobile screens. This includes adapting layouts, keeping navigation accessible, handling product galleries on smaller screens, and ensuring that buttons and other interactive elements remain usable on touch devices.

The objective was to preserve the same core experience across screen sizes instead of treating mobile as a reduced version of the desktop website.

## 06. Bilingual Architecture: Arabic and English

One of the important technical requirements was supporting Arabic and English throughout the experience.

I implemented locale-aware routing using Next.js and `next-intl`, with dedicated English and Arabic experiences.

The implementation accounts for two different reading directions:

- English uses left-to-right layout behavior.
- Arabic uses right-to-left layout behavior.

This affects more than text alignment. Navigation, icon placement, spacing, directional controls, galleries, and component transitions can all behave incorrectly if directionality is handled inconsistently.

### Beyond translating text

I treated internationalization as a system-level requirement.

The locale needs to remain consistent as users navigate between pages, and components must respond correctly to the active language. Translated content also needs to remain separate from presentation logic so that adding or updating copy does not require rebuilding individual components around each language.

The broader lesson from this implementation is that RTL support should be part of the architecture from the beginning. Retrofitting it at the end often introduces inconsistent spacing, reversed controls, and bugs that only appear in one locale.

## 07. Frontend Engineering

The storefront was built with a modern React-based stack.

**Core technologies**

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `next-intl`
- Swiper for carousel-based content
- Cloudinary for image delivery

### Component-driven development

I structured the interface around reusable components rather than repeating presentation and interaction logic across pages.

This makes it easier to keep product cards, navigation, banners, galleries, and other shared interface elements consistent. It also reduces the effort required to fix a component or introduce a change across multiple pages.

### Product galleries and interaction behavior

Product imagery requires careful interaction design. Gallery controls must remain predictable, and transitions must respect the current direction and selected image.

I paid particular attention to navigation behavior in both locales, including the relationship between previous and next controls, image transitions, and RTL layouts.

### Data fetching and loading states

Loading behavior is part of the user experience, not just an implementation detail.

I considered how product data should be retrieved, when existing server-provided data could be reused, and where loading indicators or skeletons are appropriate. These decisions help avoid unnecessary refetching and prevent content from appearing to jump unpredictably as data arrives.

The objective is to make the interface feel responsive while preserving correct data synchronization.

### Image optimization

Furniture imagery can be expensive to deliver because product photography often contains large, detailed images.

I integrated Cloudinary into the media workflow and used image-processing techniques where appropriate to reduce payload sizes. In my image-processing workflow, one PNG example was reduced from approximately 1.88 MB to 603 KB after conversion to WebP.

That example demonstrates the potential value of choosing an appropriate image format, although it is not a measurement of the entire website's performance.

## 08. Backend Architecture

The storefront is supported by a custom API built with Bun and Hono, using TypeScript and a PostgreSQL database accessed through Drizzle ORM and Neon.

**Backend stack**

- Bun
- Hono
- TypeScript
- PostgreSQL
- Neon
- Drizzle ORM
- Redis for caching
- Cloudinary for media management

The main architectural objective was to keep the backend lightweight while maintaining clear boundaries between routing, validation, business logic, data access, and external integrations.

### Why Bun and Hono?

Bun provides a JavaScript and TypeScript runtime with built-in development tooling, while Hono offers a lightweight framework for defining API routes and middleware.

Together, they provide a compact foundation for an API serving a Next.js application.

I chose this stack to keep the runtime and application structure straightforward rather than introducing a heavier framework for a project of this scope.

This was an architectural choice, not a claim that the stack is automatically faster in every production workload. Actual performance still depends on database queries, network latency, caching, deployment configuration, and application behavior.

### PostgreSQL and Drizzle

The database layer uses PostgreSQL through Neon, with Drizzle providing typed access to relational data.

This approach gives the application a structured data model and makes database interactions easier to maintain alongside the TypeScript codebase.

It also provides a clear path for evolving the schema as the catalog and administration requirements grow.

### API organization

I organized the API around the business domains it serves, including products, collections, banners, offers, messages, and dashboard analytics.

This separation helps keep each feature's responsibilities understandable and reduces the risk of unrelated features becoming tightly coupled.

It also makes future additions easier to reason about because new functionality can be introduced within an existing domain or a clearly defined new module.

## 09. Custom Admin Dashboard

The administration dashboard is one of the most important parts of the project because it connects the software to the day-to-day needs of the business.

A storefront can look polished and still be inconvenient to operate if every content change requires a developer. The dashboard addresses that operational problem.

### Product management

The product management workflow gives administrators a dedicated place to maintain the product catalog.

The underlying design separates the public presentation of a product from the administrative operations used to manage its data.

This allows the storefront to remain focused on browsing while the dashboard provides the controls needed to maintain the catalog.

### Collection management

Collections help group related products into meaningful browsing experiences.

Managing collections through the dashboard gives the business more flexibility to organize the catalog as its range evolves, without requiring collection structure to be hardcoded into the frontend.

### Banner management

Banners are an important way to communicate featured content and promotions.

I implemented banner management so that the business can maintain this content through the administrative system rather than relying on manual source-code changes for routine updates.

### Offer management

Promotional content requires more than displaying a discount label. Offers need supporting information, visibility settings, and activation behavior.

The dashboard includes offer-management functionality for maintaining promotional content, including percentage values, scheduling information, active states, banner visibility, and presentation settings.

This gives the business a more structured way to manage promotions and their appearance on the storefront.

### Messages inbox

Customer inquiries are valuable because they represent direct interactions with potential buyers.

I built an administrative inbox for reviewing incoming messages and managing their status. The backend supports message listing, individual message retrieval, viewing status, and deletion.

The system also includes duplicate-pending-message handling based on contact details, helping reduce repeated unresolved submissions.

### Dashboard analytics

The dashboard includes analytics for high-level business information and administrative visibility.

The aim is to give the business a centralized place to review relevant operational data instead of requiring administrators to inspect separate systems for routine tasks.

## 10. AI-Assisted Message Triage

A further part of the backend work was designing an AI-assisted workflow for classifying incoming customer messages.

Not every inquiry needs the same response or level of urgency. A product question, delivery problem, complaint, and general suggestion have different operational implications.

The planned classification workflow uses `typesafe-ai/jev` and Vercel AI Gateway's experimental decision functionality to assign categories and priority levels.

### Message categories

The classification design includes:

- Product inquiries
- Pricing inquiries
- Order inquiries
- Delivery issues
- Product issues
- Complaints
- Suggestions
- General inquiries
- Other messages

### Priority classification

Messages are classified into low, medium, and high priority.

The intended workflow gives high-priority messages an email escalation path while keeping other messages available in the dashboard inbox.

This allows the business to retain a central record of customer communication while making urgent issues easier to identify.

### Why this matters

The purpose of AI here is not to replace customer support. It is to help organize incoming information and direct attention toward messages that may require faster action.

The value comes from integrating classification into the existing message workflow instead of building a separate AI interface that administrators have to visit independently.

The classification and notification pipeline should be evaluated using representative Arabic and English messages, including ambiguous cases, before its operational accuracy is claimed.

## 11. Security and Reliability

A production website needs more than working pages. Its administrative operations and API must also be protected against unauthorized access and invalid requests.

I approached these concerns as part of the application architecture.

### Authentication and authorization

Administrative operations need to be protected so that public visitors cannot access management functionality simply by calling an API endpoint directly.

Authentication and authorization checks belong on the server, not only in the frontend. Hiding a dashboard button is not a substitute for enforcing permissions on the corresponding API route.

### Input validation

Incoming requests need to be validated before they reach business logic or database operations.

Structured validation helps ensure that the API handles malformed or incomplete data predictably and returns meaningful errors rather than allowing invalid input to propagate through the application.

### Caching and invalidation

Caching can reduce repeated database work, but only when invalidation is handled correctly.

For example, updating a collection or creating a new offer must not leave the storefront displaying stale information indefinitely. I incorporated cache invalidation into relevant administrative workflows so that changes can be reflected in dependent views.

### Operational reliability

Media uploads, database connections, authentication, and external services introduce failure points that need to be handled deliberately.

The goal is to make the system maintainable when something goes wrong, with clear boundaries between the API, database, and external integrations.

These are architectural and implementation considerations; they should not be interpreted as a claim that the application has undergone an independent security audit.

## 12. Performance Engineering

Performance was treated as a combination of frontend behavior, data access, image delivery, and deployment configuration.

Optimizing just one layer does not guarantee a fast experience. A lightweight API can still be slowed by a poorly placed database, while an optimized frontend can still feel slow if it downloads oversized images or performs unnecessary requests.

### Frontend performance

The main areas of attention included:

- Reusing existing data where appropriate.
- Avoiding unnecessary client-side refetching.
- Using loading states that preserve the page's structure.
- Optimizing images before delivery.
- Keeping component behavior predictable.
- Avoiding unnecessary visual effects that add work without improving the experience.

### Backend performance

On the backend, the relevant areas included database access patterns, caching, request validation, and API structure.

Redis can help reduce repeated work for suitable endpoints, but cached data must have an explicit invalidation strategy, especially when administrators modify the underlying content.

### Deployment considerations

The application uses managed infrastructure for deployment and data storage. In this setup, server region and database region are important because network latency contributes to request time.

The appropriate deployment configuration needs to be selected based on the actual production environment, not just the runtime's theoretical performance.

### Measuring results

I distinguish between implementation choices intended to improve performance and improvements demonstrated by measurement.

A proper evaluation would compare representative mobile page loads, Core Web Vitals, image payloads, API response times, and database query latency before and after optimization.

I would not describe the website as a specific number of times faster or claim a particular Lighthouse score without repeatable measurements from the deployed site.

## 13. SEO and Discoverability

For a furniture business, the website should be discoverable by customers searching for relevant products and collections.

The technical foundation includes a Next.js application with locale-aware routing, giving the project a basis for search-friendly page rendering and language-specific content.

Important areas for ongoing SEO work include:

- Unique page titles and meta descriptions.
- Descriptive product and collection content.
- Correct canonical URLs.
- Appropriate `hreflang` relationships between Arabic and English pages.
- XML sitemaps and sensible indexing rules.
- Structured data where the relevant product information supports it.
- Descriptive image alternatives.
- Consistent internal links between categories, collections, and products.

International SEO needs particular care. Two localized pages should be related correctly rather than treated as unrelated duplicates or incorrectly canonicalized to a single language.

These items form the evaluation checklist for the site; their presence and effectiveness should be verified against the live implementation before claiming complete SEO compliance.

## 14. Accessibility and Responsive Quality

A visually polished interface should also be usable by people with different devices, input methods, and accessibility needs.

The most relevant areas for this project include semantic HTML, keyboard navigation, visible focus states, accessible form labels, appropriate image alternatives, and sufficient contrast.

I also considered the tension between mobile input usability and accessibility. Disabling browser zoom may prevent an unwanted focus zoom effect on some iPhones, but it also restricts users who need to enlarge content.

The better long-term approach is to maintain readable input sizing and responsive layouts while preserving the browser's zoom capabilities.

For a complete accessibility review, I would validate the storefront and dashboard against WCAG 2.2 AA criteria, including keyboard access, focus visibility, text contrast, form errors, and screen-reader behavior.

## 15. Challenges and Lessons Learned

The most valuable parts of this project were the problems that required coordination across multiple layers rather than isolated UI changes.

### Challenge 1: Keeping Arabic and English behavior consistent

A component that works correctly in English may still behave incorrectly in Arabic because directionality affects layout and interaction.

**Lesson:** Localization needs to influence component design and testing from the beginning. Shared components should respond to locale and direction explicitly rather than relying on scattered visual overrides.

### Challenge 2: Coordinating the storefront with the dashboard

Administrative changes affect what customers see. This creates dependencies between database mutations, API responses, cached content, and frontend rendering.

**Lesson:** Content management should be designed as a complete data flow. Creating or updating data is only part of the work; the system must also ensure that dependent views reflect those changes correctly.

### Challenge 3: Managing image delivery

Large images can undermine an otherwise efficient page. Image conversion and media-hosting configuration also introduce operational details that do not appear in the visual design.

**Lesson:** Image optimization needs to be part of the delivery pipeline. Format, dimensions, quality, access configuration, and loading behavior all matter.

### Challenge 4: Building useful loading behavior

Loading indicators can communicate progress, but poorly chosen loading states make a page feel slower or less stable.

**Lesson:** Loading behavior should reflect the actual data-fetching strategy. Existing server-rendered content, cached data, skeletons, and background refreshes should have deliberate roles rather than being applied indiscriminately.

### Challenge 5: Making AI operationally useful

Classifying a message is useful only if the result changes how the business handles that message.

**Lesson:** AI features should be connected to real workflows, with clear outputs, appropriate escalation rules, and evaluation of classification quality. A model call alone is not a complete product feature.

## 16. What I Would Improve Next

The existing architecture provides a foundation for further improvements.

### Product discovery

I would expand product filtering and sorting, improve category navigation, and evaluate search behavior against the actual catalog. These improvements should be guided by customer needs and the structure of the available product data.

### Richer product information

I would prioritize consistent product attributes, including dimensions, materials, finishes, available variants, and delivery details where the business can provide them.

This information reduces uncertainty and helps customers decide whether a product is suitable for their space.

### Conversion tracking

I would add privacy-conscious analytics for key events such as product views, collection interactions, inquiry submissions, and contact actions.

This would make it possible to identify where visitors lose interest and determine which improvements have measurable effects on the customer journey.

### Better operational reporting

The administrative dashboard could evolve to include inquiry trends, response times, popular collections, and promotion performance, provided those metrics are supported by reliable underlying data.

### Automated testing

I would expand automated coverage around authentication, product management, offer scheduling, message handling, cache invalidation, and locale-specific behavior.

End-to-end tests should cover important customer journeys in both Arabic and English.

### Accessibility and performance audits

I would run repeatable production audits on representative mobile and desktop devices, track Core Web Vitals, and verify accessibility using automated tools alongside manual keyboard and screen-reader testing.

These steps would turn qualitative improvements into a measurable engineering process.

## 17. Results and Deliverables

The project brings together the customer-facing website and the tools required to maintain it.

**Delivered product capabilities**

- A responsive furniture storefront.
- English and Arabic localization with RTL support.
- Product and collection browsing.
- Promotional banner and offer management.
- A custom administration dashboard.
- An API built with Bun and Hono.
- PostgreSQL data access through Neon and Drizzle.
- Redis-backed caching and relevant invalidation workflows.
- Cloudinary-based media handling.
- Customer message management.
- Dashboard analytics.
- An AI-assisted message-classification workflow designed for priority-based handling.

The most important outcome is the integration of these capabilities into a single system rather than a collection of disconnected pages and services.

I have not included fabricated conversion rates, traffic growth, sales increases, or performance scores. Those results require analytics or repeatable measurements from the deployed application.

## 18. Technology Stack

| Layer | Technologies |
|---|---|
| Frontend framework | Next.js 16 |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Internationalization | `next-intl` |
| Carousel | Swiper |
| Backend runtime | Bun |
| API framework | Hono |
| Database | PostgreSQL |
| Database platform | Neon |
| ORM | Drizzle |
| Caching | Redis |
| Media | Cloudinary |
| AI workflow | `typesafe-ai/jev`, Vercel AI Gateway |
| Deployment | Vercel and managed database infrastructure |

## 19. Final Reflection

Teleb Furniture was an opportunity to approach web development as a product engineering problem rather than a page-building exercise.

The visible storefront matters, but so do the systems that support it: structured data, content management, authentication, image delivery, localization, caching, and customer communication.

Working across these layers required thinking about how individual technical decisions affect the overall experience. A change in the database can affect a product card. A locale decision can affect gallery controls. A caching strategy can affect whether a promotion appears correctly. An AI classification result only matters if it reaches the right operational workflow.

That is the part of the project I value most: bringing the frontend and backend together into a coherent product that the business can maintain and extend.

**Teleb Furniture represents my approach to full-stack development: build the experience customers use, build the systems that power it, and make the two work together reliably.**

**Live project:** https://www.teleb-furniture.com/en  