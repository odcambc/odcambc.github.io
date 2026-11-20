---
layout: page
permalink: /reviews/
title: reviews
description: public peer reviews.
group: reviews
nav: true
nav_order: 4
---

Peer review is a good idea. Gatekeeping is not. As a reviewer, I see my job as sharpening the work by defining the boundaries of what can be supported, not dictating
what I want the work to be. I aim to be attentive, courteous, and constructive. As a mentor, I try to involve trainees in the review process as well.

See the peer review section of the [Fraser lab compact](https://fraserlab.com/philosophy/) for a lot more on this topic that I agree with,
along with the [Peer Review in the Life Sciences](https://fraserlab.com/courses/peer_review_2023/) course we co-taught in 2023. Also see
the polemically-titled ["Is Peer Review a Good Idea?"](https://www.journals.uchicago.edu/doi/10.1093/bjps/axz029) by Remco Heesen and Liam
Kofi Bright for an interesting argument.

<div class="site-reviews">
{% assign sorted = site.reviews | sort: "date" | reverse %}
{% for review in sorted %}

    <article class="site-record" id="{{ review.date }}">
    <header class="site-record-header">
    <div><h2 class="site-record-title">{{ review.title | markdownify | remove: '<p>' | remove: '</p>' | strip }}.<br></h2>
    <h3 class="site-record-subtitle">{{ review.authors | markdownify | remove: '<p>' | remove: '</p>' | strip}}.</h3><br>
    Reviewed by: <strong>{{ review.reviewers | markdownify | remove: '<p>' | remove: '</p>' | strip }}.</strong><br><br>
    </div>
    {% if review.abstract %}
    <div>{{ review.abstract | markdownify | remove: '<p>' | remove: '</p>' }}</div>
    {% endif %}
    <br>
    </header>

    <div class="site-record-details site-review-details">
      <div class="site-record-figure">
        {% if review.image %}
        <img class="site-record-image" src="{{ review.image | relative_url }}" alt = "Representative Image" style="max-height: 250px;">
        {% endif %}
      </div>
      <ul class="site-record-links">
        <li class="site-link-heading"><h3 class="site-record-subtitle">Peer Review</h3></li>
        {% for record in review.peer-review %}
          <!--Biorxiv-->
          {% if record.biorxiv %}
          <li>Biorxiv Preprint: <a href="https://doi.org/10.1101/{{ record.biorxiv }}" target="_blank" title="bioRxiv preprint: {{ record.biorxiv }}">{{record.biorxiv | split: "." | last }}</a></li>
          {% endif %}

          <!--Biorxiv specific version-->
          {% if record.biorxiv_version %}
          <li>Biorxiv Preprint v{{record.biorxiv_version | split: "." | last | split: "v" | last }}: <a href="http://www.biorxiv.org/content/10.1101/{{record.biorxiv_version}}" target="_blank" alt = "biorxiv preprint link: {{record.biorxiv_version}}">{{record.biorxiv_version | split: "." | last | split: "v" | first }}</a></li>
          {% endif %}

          <!--Arxiv-->
          {% if record.arxiv %}
          <li>arXiv Preprint: <a href="https://arxiv.org/abs/{{record.arxiv}}" target="_blank" alt = "arxiv preprint link: {{record.arxiv}}">{{record.arxiv}}</a></li>
          {% endif %}

          <!--prereview.org -->
          {% if record.prereview %}
          <li>PREreview.org: <a href="https://www.prereview.org/reviews/{{record.prereview}}" target="_blank" alt = "prereview.org preprint link: {{record.prereview}}">{{record.prereview}}</a></li>
          {% endif %}

          <!--prereview.org beta version -->
          {% if record.prereview_beta %}
          <li>PREreview.org: <a href="https://beta.prereview.org/preprints/{{record.prereview_beta}}" target="_blank" alt = "prereview.org preprint link: {{record.prereview_beta}}">{{record.prereview_beta}}</a></li>
          {% endif %}

          <!--Chemrxiv-->
          {% if record.chemrxiv %}
          <li>ChemRxiv Preprint: <a href=" https://doi.org/10.26434/chemrxiv.{{record.chemrxiv}}" target="_blank" alt = "chemrxiv preprint link: {{record.chemrxiv}}">{{record.chemrxiv}}</a></li>
          {% endif %}

          <!--Preprints.org -->
          {% if record.preprintsorg %}
          <li>Preprints.org: <a href="https://www.preprints.org/manuscript/{{record.preprintsorg}}" target="_blank" alt = "preprints.org preprint link: {{record.preprintsorg}}">{{record.preprintsorg}}</a></li>
          {% endif %}


          <!--Disqus comment-->
          {% if record.disqus %}
          <li>Review: <a href="http://disq.us/p/{{record.disqus}}" target="_blank" alt = "link to review as Disqus comment: {{record.disqus}}">{{record.disqus}}</a></li>
          {% endif %}

          <!--TRiP Review-->
          {% if record.trip %}
          <li>Reviewer: <a href="http://www.biorxiv.org/content/10.1101/{{record.biorxiv_version}}#review" target="_blank" alt = "link to review as TRiP comment: {{record.trip}}">#{{record.trip}}</a></li>
          {% endif %}

          <!--zenodo record-->
          {% if record.zenodo %}
          <li>Zenodo Record: <a href="https://www.zenodo.org/record/{{record.zenodo}}" target="_blank" alt = "link to review as zenodo PDF: {{record.zenodo}}">{{record.zenodo}}</a></li>
          {% endif %}

          {% if record.pdf %}
          <li>Review: <a href="{{record.pdf}}" target="_blank" alt="link to full review text: {{record.pdf}}">Full Text</a></li>
          {% endif %}

          <!--url-->
          {% if record.url %}
          <li>Review: <a href="{{record.url}}" target="_blank" alt="link to review}}">Review link</a></li>
          {% endif %}

        {% endfor %}

      {% if review.links %}
        <br>
        <li class="site-link-heading"><h4 class="site-record-subtitle">Additional Link{% if review.links.size > 1 %}s{% endif %}</h4></li>
        {% for link in review.links %}
          <li><a href="{{link.url}}" alt="{{link.name}} (opens in new tab)" target="_blank">{{link.name}}</a></li>
        {% endfor %}
      {% endif %}

      {% if review.response %}
      <br>
      <li class="site-link-heading"><h3 class="site-record-subtitle">Author response</h3></li>
      <li class="site-link-heading"><h4 class="site-record-subtitle">Read the response</h4></li>
      {% for record in review.response %}
        {% if record.url %}
        <li>Link: <a href="{{record.url}}" target="_blank" alt = "link: {{record.url}}">{{record.url}}</a></li>
        {% endif %}
        <!--Disqus comment-->
        {% if record.disqus %}
        <li>Response: <a href="http://disq.us/p/{{record.disqus}}" target="_blank" alt = "link to response as Disqus comment: {{record.disqus}}">{{record.disqus}}</a></li>
        {% endif %}

      {% endfor %}
      {% endif %}


      </ul>
      <ul class="site-record-links">
      {% if review.published %}
        <li class="site-link-heading"><h3 class="site-record-subtitle">Post-Review</h3></li>
        <li class="site-link-heading"><h4 class="site-record-subtitle">Access the paper</h4></li>
        {% for record in review.published %}
          {% if record.pmid %}
          <li>PMID: <a href="http://www.ncbi.nlm.nih.gov/pubmed/{{record.pmid}}" target="_blank" alt = "pubmed link: {{record.pmid}}">{{record.pmid}}</a></li>
          {% endif %}
          {% if record.pdf %}
          <li><a href="{{record.pdf}}" target="_blank" alt="link to full text: {{record.pdf}}">Full Text</a></li>
          {% endif %}
        {% endfor %}

        {% if review.highlight %}
          <br><li class="site-link-heading"><h4 class="site-record-subtitle">Highlight</h4></li>
          {% for record in review.highlight %}
            <!--Article Title-->
            {% if record.title %}
              <li>{{record.title | markdownify | remove: '<p>' | remove: '</p>' | strip }}.</li>
            {% endif %}

            <!--Authors-->
            {% if record.authors %}
              {{record.authors | markdownify | remove: '<p>' | remove: '</p>' | strip }}.
            {% endif %}

            <!--Journal-->
            {% if record.journal %}
              <i>{{record.journal}}.</i>
            {% endif %}

            <!--Publication Date-->
            {% if review.date %}
              {{review.date | split: "-" | first }}.
            {% endif %}
            <br>

            <!--Zenodo Record-->
            {% if record.zenodo %}
            <li>Zenodo Record: <a href="https://www.zenodo.org/record/{{record.zenodo}}" target="_blank" alt = "link to review as zenodo: {{record.zenodo}}">{{record.zenodo}}</a></li>
            {% endif %}

            <!--PDF-->
            {% if record.pdf %}
            <li><a href="{{record.pdf}}" target="_blank" alt="link to full text: {{record.pdf}}">Full Text</a></li>
            {% endif %}

          {% endfor %}
        {% endif %}
      {% endif %}
      </ul>
    </div>
    </article>

{% endfor %}

</div>
