---
layout: post
title: PyMOL mapping notes
date: 2024-05-30 15:32:13
description: Reminders for pymol b factor spectrum mapping
tags:
categories:
tabs: true
---

Plotting things on a structure using PyMOL is fun but fiddly. You need to scale it yourself, and there isn't a way to set a midpoint for a scale by default.

Here is some code that will do that, assuming there are two models `model_A` and `model_B`, and the score is mapped to the b-factor of each. This will keep the midpoint at 0, and scale the negative and positive values independently while keeping the midpoint at 0. It will also add a scale at the bottom of the screen showing the scale.

```python
select b > 0
set_name sele,positive

select b < 0
set_name sele,negative

# These should be symmetric for proper scaling
spectrum b, red_white_blue, negative and model_A, minimum = -5, maximum = 5
spectrum b, red_white_blue, positive and model_A, minimum = -1, maximum = 1
# Set this to the limits above
ramp_new indel, model_A, [1, 0, -5], [blue, white, red]

# These should be symmetric for proper scaling
spectrum b, red_white_blue, negative and model_B, minimum = -4, maximum = 4
spectrum b, red_white_blue, positive and model_B, minimum = -1, maximum = 1
# Set this to the limits above
ramp_new indel, model_B, [1, 0, -4], [blue, white, red]
```