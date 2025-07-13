// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "a list of current publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-reviews",
          title: "reviews",
          description: "public peer reviews.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/reviews/";
          },
        },{id: "post-chain-renaming-in-pymol",
        
          title: "Chain renaming in PyMOL",
        
        description: "Renaming chains uniquely",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/chain_renaming_pymol/";
          
        },
      },{id: "post-de-spaghettification",
        
          title: "De-spaghettification",
        
        description: "Making pseudo-densities",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/fake_densities/";
          
        },
      },{id: "post-pymol-mapping-notes",
        
          title: "PyMOL mapping notes",
        
        description: "Reminders for pymol b factor spectrum mapping",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/more_pymol_notes/";
          
        },
      },{id: "post-note-to-self",
        
          title: "Note to self",
        
        description: "I learned something new about ls",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/note-to-self/";
          
        },
      },{id: "post-some-one-liners",
        
          title: "Some one-liners",
        
        description: "Some fastq/fasta manipulations",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/commands/";
          
        },
      },{id: "post-sanger-to-fastq",
        
          title: "Sanger to fastq",
        
        description: "A quick script to convert ab1 files to fastq",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/abi/";
          
        },
      },{id: "post-some-useful-pymol-defaults",
        
          title: "Some useful PyMOL defaults",
        
        description: "dot pymolrc",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/pymol/";
          
        },
      },{id: "post-oct1-paper-is-out",
        
          title: "OCT1 paper is out",
        
        description: "OCT1 paper is out",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/oct1/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-i-started-my-postdoctoral-appointment-in-the-fraser-lab-at-ucsf",
          title: 'I started my postdoctoral appointment in the Fraser Lab at UCSF!',
          description: "",
          section: "News",},{id: "news-i-presented-a-poster-at-the-2022-biophysical-society-meeting",
          title: 'I presented a poster at the 2022 Biophysical Society meeting.',
          description: "",
          section: "News",},{id: "news-i-m-attending-the-ligand-recognition-and-molecular-gating-gordon-research-conference-and-seminar-in-italy",
          title: 'I’m attending the Ligand Recognition and Molecular Gating Gordon Research conference and seminar...',
          description: "",
          section: "News",},{id: "news-we-just-posted-a-preprint-of-our-dms-library-generation-technique-dimple",
          title: 'We just posted a preprint of our DMS library generation technique, DIMPLE.',
          description: "",
          section: "News",},{id: "news-alexis-started-her-phd-program-in-biophysics-at-johns-hopkins-university-congrats",
          title: 'Alexis started her PhD program in Biophysics at Johns Hopkins University - congrats!...',
          description: "",
          section: "News",},{id: "news-our-review-of-the-smrs-is-online-at-jbc-now-take-a-look-still-rocking-in-the-structural-era-a-molecular-overview-of-the-small-multidrug-resistance-smr-transporter-family",
          title: 'Our review of the SMRs is online at JBC now: take a look!...',
          description: "",
          section: "News",},{id: "news-i-am-giving-a-seminar-at-the-university-of-san-francisco-breaking-things-to-see-how-they-work-predicting-antibiotic-resistance-with-massively-parallel-assays-thanks-to-professors-janet-yang-usf-and-bassem-al-sady-ucsf-for-the-opportunity",
          title: 'I am giving a seminar at the University of San Francisco: “Breaking things...',
          description: "",
          section: "News",},{id: "news-samantha-martinez-from-the-university-of-san-francisco-spent-the-break-in-the-lab-working-on-a-project-with-us-and-gave-a-great-presentation-for-the-ucsf-usf-internship-program-thanks-for-your-hard-work-samantha",
          title: 'Samantha Martinez from the University of San Francisco spent the break in the...',
          description: "",
          section: "News",},{id: "news-i-received-a-mary-anne-koda-kimble-seed-award-for-innovation-to-support-my-efforts-for-massively-combinatorial-library-generation-for-transformative-pharmacogenomics-with-an-exciting-acronym-shrimple",
          title: 'I received a Mary Anne Koda-Kimble Seed Award for Innovation to support my...',
          description: "",
          section: "News",},{id: "news-i-was-awarded-an-f32-through-nigms-for-my-proposal-connecting-structure-and-fitness-landscapes-to-overcome-antibiotic-resistance",
          title: 'I was awarded an F32 through NIGMS for my proposal “Connecting structure and...',
          description: "",
          section: "News",},{id: "news-we-had-a-few-papers-published-recently-our-paper-on-the-drug-transporter-oct1-was-published-in-molecular-cell-and-our-rosace-paper-was-just-published-in-genome-biology-also-matt-s-preprint-on-a-proton-sensing-gpcr-is-up-on-biorxiv-as-well-as-gabby-s-preprint-on-met-kinase-fusions-and-activating-mutations",
          title: 'We had a few papers published recently: our paper on the drug transporter...',
          description: "",
          section: "News",},{id: "news-gabby-s-followup-preprint-performing-inhibitor-screens-against-met-kinase-libraries-is-now-on-biorxiv-priyanka-and-i-also-published-a-review-of-an-interesting-recent-preprint-by-vincoff-et-al-which-fine-tuned-esm-2-on-fusion-oncoproteins-read-it-on-prereview-https-prereview-org-reviews-12658078-finally-i-just-joined-the-organizing-committee-of-the-atlas-of-variant-effects-seminar-series",
          title: 'Gabby’s followup preprint performing inhibitor screens against MET kinase libraries is now on...',
          description: "",
          section: "News",},{id: "publications-antineoplastic-agents-599-total-synthesis-of-dolastatin-16",
          title: 'Antineoplastic Agents. 599. Total Synthesis of Dolastatin 16',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2015-JNP599/";
            },},{id: "publications-antineoplastic-agents-600-from-the-south-pacific-ocean-to-the-silstatins",
          title: 'Antineoplastic Agents. 600. From the South Pacific Ocean to the Silstatins',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2015-JNP600/";
            },},{id: "publications-a-topologically-diverse-family-of-fluoride-channels",
          title: 'A topologically diverse family of fluoride channels',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2017-COSB/";
            },},{id: "publications-guanidinium-export-is-the-primal-function-of-smr-family-transporters",
          title: 'Guanidinium export is the primal function of SMR family transporters',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2018-PNAS/";
            },},{id: "publications-the-structural-basis-of-promiscuity-in-small-multidrug-resistance-transporters",
          title: 'The structural basis of promiscuity in small multidrug resistance transporters',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2020-Macdonald_Kermani/";
            },},{id: "publications-deep-insertion-deletion-and-missense-mutation-libraries-for-exploring-protein-variation-in-evolution-disease-and-biology",
          title: 'Deep insertion, deletion, and missense mutation libraries for exploring protein variation in evolution,...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2022-07-27-macdonald/";
            },},{id: "publications-still-rocking-in-the-structural-era-a-molecular-overview-of-the-small-multidrug-resistance-smr-transporter-family",
          title: 'Still rocking in the structural era: a molecular overview of the Small Multidrug...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2022-09-12-JBC/";
            },},{id: "publications-conserved-regulatory-motifs-in-the-juxtamembrane-domain-and-kinase-n-lobe-revealed-through-deep-mutational-scanning-of-the-met-receptor-tyrosine-kinase-domain",
          title: 'Conserved regulatory motifs in the juxtamembrane domain and kinase N-lobe revealed through deep...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2023_estevam/";
            },},{id: "publications-rosace-a-robust-deep-mutational-scanning-analysis-framework-employing-position-and-mean-variance-shrinkage",
          title: 'Rosace: a robust deep mutational scanning analysis framework employing position and mean-variance shrinkage...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2023_rao/";
            },},{id: "publications-the-full-spectrum-of-slc22-oct1-mutations-illuminates-the-bridge-between-drug-transporter-biophysics-and-pharmacogenomics",
          title: 'The full spectrum of SLC22 OCT1 mutations illuminates the bridge between drug transporter...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2023_yee/";
            },},{id: "publications-mapping-kinase-domain-resistance-mechanisms-for-the-met-receptor-tyrosine-kinase-via-deep-mutational-scanning",
          title: 'Mapping kinase domain resistance mechanisms for the MET receptor tyrosine kinase via deep...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2024_estevam/";
            },},{id: "publications-molecular-basis-of-proton-sensing-by-g-protein-coupled-receptors",
          title: 'Molecular basis of proton-sensing by G protein-coupled receptors',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2024_howard/";
            },},{id: "publications-a-suite-of-foundation-models-captures-the-contextual-interplay-between-codons",
          title: 'A Suite of Foundation Models Captures the Contextual Interplay Between Codons',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2024_naghipourfar/";
            },},{id: "publications-deep-mutational-scanning-of-eccd3-reveals-the-molecular-basis-of-its-essentiality-in-the-mycobacterium-esx-secretion-system",
          title: 'Deep mutational scanning of EccD3 reveals the molecular basis of its essentiality in...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2024_trinidad/";
            },},{id: "publications-initial-leads-to-combat-streptogramin-resistance-generated-from-x-ray-fragment-screening-against-vatd",
          title: 'Initial leads to combat streptogramin resistance generated from X-ray fragment screening against VatD...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2025_asthana/";
            },},{id: "publications-accurate-variant-effect-estimation-in-facs-based-deep-mutational-scanning-data-with-lilace",
          title: 'Accurate variant effect estimation in FACS-based deep mutational scanning data with Lilace',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2025_freudenberg/";
            },},{id: "publications-understanding-inhibiting-and-engineering-membrane-transporters-with-high-throughput-mutational-screens",
          title: 'Understanding, inhibiting, and engineering membrane transporters with high-throughput mutational screens',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2025_miller/";
            },},{id: "publications-rosace-aa-enhancing-interpretation-of-deep-mutational-scanning-data-with-amino-acid-substitution-and-position-specific-insights",
          title: 'Rosace-AA: Enhancing Interpretation of Deep Mutational Scanning Data with Amino Acid Substitution and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publications/2025_rao/";
            },},{id: "reviews-comprehensive-fitness-landscape-of-sars-cov-2-mpro-reveals-insights-into-viral-resistance-mechanisms",
          title: 'Comprehensive fitness landscape of SARS-CoV-2 Mpro reveals insights into viral resistance mechanisms',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2022-06-20-flynn/";
            },},{id: "reviews-interpreting-the-molecular-mechanisms-of-disease-variants-in-human-membrane-proteins",
          title: 'Interpreting the molecular mechanisms of disease variants in human membrane proteins',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2022-09-02-tiemann/";
            },},{id: "reviews-higher-order-epistasis-creates-idiosyncrasy-confounding-predictions-in-protein-evolution",
          title: 'Higher-order epistasis creates idiosyncrasy, confounding predictions in protein evolution',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2022-10-14-buda/";
            },},{id: "reviews-activating-alternative-transport-modes-in-a-multidrug-resistance-efflux-pump-to-confer-chemical-susceptibility",
          title: 'Activating alternative transport modes in a multidrug resistance efflux pump to confer chemical...',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2022-11-08-spreacker/";
            },},{id: "reviews-nitrogenase-resurrection-and-the-evolution-of-a-singular-enzymatic-mechanism",
          title: 'Nitrogenase resurrection and the evolution of a singular enzymatic mechanism',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023-02-14-garcia/";
            },},{id: "reviews-mutation-in-glutamate-transporter-homologue-glttk-provides-insights-into-pathologic-mechanism-of-episodic-ataxia-6",
          title: 'Mutation in glutamate transporter homologue GltTk provides insights into pathologic mechanism of episodic...',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023-03-31-colucci/";
            },},{id: "reviews-deep-boosted-molecular-dynamics-dbmd-accelerating-molecular-simulations-with-gaussian-boost-potentials-generated-using-probabilistic-bayesian-deep-neural-network",
          title: 'Deep Boosted Molecular Dynamics (DBMD): Accelerating molecular simulations with Gaussian boost potentials generated...',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023_bp219_do/";
            },},{id: "reviews-decoding-the-cure-all-effects-of-ginseng",
          title: 'Decoding the Cure-all Effects of Ginseng',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023_bp219_loo/";
            },},{id: "reviews-the-herbicide-acetochlor-causes-lipid-peroxidation-by-inhibition-of-glutathione-peroxidase-4",
          title: 'The Herbicide Acetochlor Causes Lipid Peroxidation by Inhibition of Glutathione Peroxidase 4',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023_bp219_mesmar/";
            },},{id: "reviews-phosphorylation-of-pyruvate-dehydrogenase-marks-the-inhibition-of-in-vivo-neuronal-activity",
          title: 'Phosphorylation of pyruvate dehydrogenase marks the inhibition of in vivo neuronal activity',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023_bp219_yang/";
            },},{id: "reviews-the-conserved-protein-cba1-is-required-for-vitamin-b12-uptake-in-different-algal-lineages",
          title: 'The conserved protein CBA1 is required for vitamin B12 uptake in different algal...',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023_bp219_sayer/";
            },},{id: "reviews-heterogeneous-folding-landscapes-and-predetermined-breaking-points-within-a-protein-family",
          title: 'Heterogeneous folding landscapes and predetermined breaking points within a protein family',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2024_macdonald_pechmann/";
            },},{id: "reviews-fuson-plm-a-fusion-oncoprotein-specific-language-model-via-focused-probabilistic-masking",
          title: 'FusOn-pLM: A Fusion Oncoprotein-Specific Language Model via Focused Probabilistic Masking',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2024_vincoff/";
            },},{id: "reviews-the-simplicity-of-protein-sequence-function-relationships",
          title: 'The simplicity of protein sequence-function relationships',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023-park/";
            },},{id: "reviews-the-genetic-architecture-of-protein-stability",
          title: 'The genetic architecture of protein stability',
          description: "",
          section: "Reviews",handler: () => {
              window.location.href = "/reviews/2023-faure/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/odcambc", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-0201-8832", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%72%69%73%74%69%61%6E.%6D%61%63%64%6F%6E%61%6C%64 %61%74 %75%63%73%66.%65%64%75", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
