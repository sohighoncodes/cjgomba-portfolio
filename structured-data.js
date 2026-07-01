const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://cjgomba-portfolio.pages.dev/#person",
      name: "CJ Gomba",
      url: "https://cjgomba-portfolio.pages.dev/",
      image: "https://cjgomba-portfolio.pages.dev/assets/branding/cj-profile.png",
      jobTitle: "Automation and Integration Specialist",
      email: "mailto:cjgomba1003@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PH"
      },
      sameAs: [
        "https://www.linkedin.com/in/cj-gomba-693551203/",
        "https://www.upwork.com/freelancers/~01ed96ebe829cb086c"
      ],
      knowsAbout: [
        "CRM automation",
        "Business process automation",
        "API integration",
        "Lead management",
        "Sales pipeline automation"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://cjgomba-portfolio.pages.dev/#website",
      url: "https://cjgomba-portfolio.pages.dev/",
      name: "CJ Gomba",
      description: "Automation, CRM, and integration portfolio of CJ Gomba",
      publisher: {
        "@id": "https://cjgomba-portfolio.pages.dev/#person"
      }
    }
  ]
};

const structuredDataElement = document.createElement("script");
structuredDataElement.type = "application/ld+json";
structuredDataElement.textContent = JSON.stringify(structuredData);
document.head.append(structuredDataElement);
