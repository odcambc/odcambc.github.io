---
layout: page
permalink: /publications/
title: publications
description: a list of current publications.
group: publications
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% assign sorted = site.publications | sort: "pub_date" | reverse %}
{% for publication in sorted %}

<hr>
<div class="row" style="padding-top: 60px; margin-top: -60px;" id="{{publication.pmid}}">
	<div>
		<h5>{{ publication.title | markdownify  | remove: '<p>' | remove: '</p>'}}</h5>
		<h6>{{ publication.authors | markdownify | remove: '<p>' | remove: '</p>' }}</h6>
		{% if publication.journal %}
			<i>{{ publication.journal }},</i>
			{{publication.pub_date | split: "-" | first }}
		{% else %}
			{% if publication.biorxiv %}
			<i>Biorxiv,</i>
				{{publication.biorxiv | split: "." | first }}
			{% elsif publication.biorxiv_version %}
			<i>Biorxiv,</i>
				{{publication.biorxiv_version | split: "." | first }}
			{% else %}
			<i>Preprint,</i>
				{{publication.pub_date | split: "-" | first }}
			{% endif %}
		{% endif %}
	</div>
</div>

<div class="row" style="padding-top: 20px; margin-top: -20px">
	<div class="col-sm-6">
		<img class = "img-fluid" src = "{{publication.image}}" alt = "Key Figure" style="max-height: 200px;">
	</div>
	<ul class="col-sm-6">
		<br>
		<h6>Access the paper</h6>
		<!--PMID-->
		{% if publication.pmid %}
		<li>PMID: <a href="http://www.ncbi.nlm.nih.gov/pubmed/{{publication.pmid}}" title = "PubMed: {{publication.pmid}} (opens in new tab)" target="_blank"> {{publication.pmid}}</a></li>
		{% endif %}

    	<!--PMCID - optional -->
    	{% if publication.pmcid %}
    	<li>PMCID: <a href="http://www.ncbi.nlm.nih.gov/pmc/articles/{{publication.pmcid}}" title = "PubMed Central: {{publication.pmcid}} (opens in new tab)" target="_blank"> {{publication.pmcid}}</a></li>
    	{% endif %}

    	<!--Biorxiv - optional -->
    	{% if publication.biorxiv %}
    	<li>Biorxiv Preprint: <a href="http://dx.doi.org/10.1101/{{publication.biorxiv}}" title =  "BioRxiv Preprint: {{publication.biorxiv}} (opens in new tab)" target="_blank"> {{publication.biorxiv | split: "." | last }}</a></li>
    	{% endif %}

    	<!--Biorxiv specific version-->
    	{% if publication.biorxiv_version %}
    	<li>Biorxiv Preprint v{{publication.biorxiv_version | split: "." | last | split: "v" | last }}: <a href="http://www.biorxiv.org/content/10.1101/{{publication.biorxiv_version}}" title =  "BioRxiv Preprint: {{publication.biorxiv_version}} (opens in new tab)" target="_blank">{{publication.biorxiv_version | split: "." | last | split: "v" | first }}</a></li>
    	{% endif %}

    	<!--Arxiv - optional -->
    	{% if publication.arxiv %}
    	<li>arXiv Preprint: <a href="https://arxiv.org/abs/{{publication.arxiv}}" title = "aRxiv Preprint: {{publication.arxiv}} (opens in new tab)" target="_blank"> {{publication.arxiv}}</a></li>
    	{% endif %}

    	<!--Chemrxiv - optional -->
    	{% if publication.chemrxiv %}
    	<li>ChemRxiv Preprint: <a href="https://doi.org/10.26434/chemrxiv-{{publication.chemrxiv}}" title = "ChemRxiv Preprint: {{publication.chemrxiv}} (opens in new tab)" target="_blank"> {{publication.chemrxiv}}</a></li>
    	{% endif %}

    	<!-- PDF -->
    	{% if publication.journal %}
    	    {% if publication.pdf %}
    	<li><a href="{{publication.pdf}}" title = "PDF for {{publication.title}} (opens in new tab)" target="_blank"> Full Text</a></li>
    	    {% endif %}
    	{% endif %}

    	<!--OSF - optional -->
    	{% if publication.osf %}
    	<li>OSF Preprint: <a href="https://osf.io/{{publication.osf}}" title = "OSF Preprint: {{publication.osf}} (opens in new tab)" target="_blank"> {{publication.osf}}</a></li>
    	{% endif %}

    	<!-- SBGrid Datasets - optional -->
    	{% if publication.data %}
    	<li>Online Dataset{% if publication.data.size > 1 %}s{% endif %}:
    		{% if publication.data.size > 1 %}
    		<ul>
    			{% for dataset in publication.data %}
    			<li><a href="http://dx.doi.org/{{dataset}}" title =  "SBGrid Data Repository (opens in new tab)" target="_blank">doi: {{dataset}}</a></li>
    			{% endfor %}
    		</ul>
    		{% else %}
    		<a href="http://dx.doi.org/{{publication.data}}" title =  "SBGrid Data Repository (opens in new tab)" target="_blank">doi: {{publication.data}}</a>
    		{% endif %}
    	</li>
    	{% endif %}

    	<!--PDBs - optional-->
    	{% if publication.pdbs %}
    	<li>Deposited Structure{% if publication.pdbs.size > 1 %}s{% endif %}:
    		{% for code in publication.pdbs %}
    		<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{code}}" title =  "PDB: {{code}} (opens in new tab)" target="_blank">{{code}}</a>{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--EMDBs - optional-->
    	{% if publication.emdbs %}
    	<li>Deposited Map{% if publication.emdbs.size > 1 %}s{% endif %}:
    		{% for code in publication.emdbs %}
    		<a href="http://www.ebi.ac.uk/pdbe/entry/emdb/EMD-{{code}}" title =  "EMDB: {{code}} (opens in new tab)" target="_blank">{{code}}</a>{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--pairs of maps and models - optional-->
    	{% if publication.paired_maps_and_models %}
    	<li>Deposited Structure{% if publication.paired_maps_and_models.size > 1 %}s{% endif %} and Map{% if publication.paired_maps_and_models.size > 1 %}s{% endif %}:
    		{% for pair in publication.paired_maps_and_models %}
    		<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{pair.pdb}}" title =  "PDB and Map pair: {{pair.pdb}} (opens in new tab)" target="_blank">{{pair.pdb}}</a>/<a href="http://www.ebi.ac.uk/pdbe/entry/emdb/EMD-{{pair.emdb}}">{{pair.emdb}}</a>{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--maps and models and datasets - optional-->
    	{% if publication.paired_maps_and_models_and_data %}
    	<li>Deposited Structure{% if publication.paired_maps_and_models_and_data.size > 1 %}s{% endif %}, Map{% if publication.paired_maps_and_models_and_data.size > 1 %}s{% endif %}, and Data set{% if publication.paired_maps_and_models_and_data.size > 1 %}s{% endif %}:
    		{% for pair in publication.paired_maps_and_models_and_data %}
    		<a href="http://www.rcsb.org/pdb/explore/explore.do?structureId={{pair.pdb}}" title =  "PDB and Map pair: {{pair.pdb}} (opens in new tab)" target="_blank">{{pair.pdb}}</a>/<a href="http://www.ebi.ac.uk/pdbe/entry/emdb/EMD-{{pair.emdb}}">{{pair.emdb}}</a>/<a href="https://empiar.org/{{pair.empiar}}/">{{pair.empiar}}</a>{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--zenodo records - optional-->
    	{% if publication.zenodo %}
    	<li>Zenodo Record{% if publication.zenodo.size > 1 %}s{% endif %}:
    		{% for record in publication.zenodo %}
    		<a href="https://www.zenodo.org/record/{{record.code}}/" title =  "Zenodo: {{record.code}} (opens in new tab)" target="_blank">{{record.code}}</a>{% if record.description %} ({{record.description}}){% endif %}{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--Github - optional-->
    	{% if publication.github %}
    	<li>{% if publication.github.size > 1 %}GitHub Repositories:{%else%}GitHub Repository:{% endif %}
    		{% for record in publication.github %}
    			<a href="https://www.github.com/{{record.url}}/" alt="GitHub Repository: {{record.url}} (opens in new tab)" target="_blank">{{record.url}}</a>{% if record.description %} ({{record.description}}){% endif %}{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!-- addgene plasmid - optional -->
    	{% if publication.addgene %}
    	<li>Addgene Plasmid{% if publication.addgene.size > 1 %}s{% endif %}:
    		{% for record in publication.addgene %}
    			<a href="https://www.addgene.org/{{record.plasmid}}/" alt="Addgene Plasmid: {{record.plasmid}} (opens in new tab)" target="_blank">{{record.plasmid}}</a>{% if record.description %} ({{record.description}}){% endif %}{% unless forloop.last %}, {% endunless %}
    		{% endfor %}
    	</li>
    	{% endif %}

    	<!--additional links - optional-->
    	{% if publication.links %}
    		<br>
    		<h6>Additional Link{% if publication.links.size > 1 %}s{% endif %}</h6>
    		{% for link in publication.links %}
    			<li><a href="{{link.url}}" alt="{{link.name}} (opens in new tab)" target="_blank">{{link.name}}</a></li>
    		{% endfor %}
    	{% endif %}
    </ul>

</div>
<br>
{% endfor %}
</div>
