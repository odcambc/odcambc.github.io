---
layout: page
permalink: /publications/
title: publications
description: Publications and preprints in reverse chronological order.
years: [2015, 2017, 2018, 2020, 2022, Forthcoming]
nav: true
nav_order: 4
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years reversed %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
