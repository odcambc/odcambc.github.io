gt---
layout: post
title: Chain renaming in PyMOL
date: 2024-06-06 10:32:13
description: Renaming chains uniquely
tags:
categories:
tabs: true
---

For some reason, I wanted to rename all the chains in a PyMOL session to be unique once. Here's a script to do so.

```python
from string import ascii_uppercase

i = 0

for model in cmd.get_object_list():\
    if i > 25:\
        chain_id = "A" + ascii_uppercase[i-26]\
    else:\
        chain_id = ascii_uppercase[i]\
    cmd.alter(model, f"chain=\"{chain_id}\"")\
    i = i + 1
```
