---
title: SVG Filter Heatmaps
date: 2024-02-15
description: Using SVG filters to create an animatable heatmap effect.
image: { src: './svg-heatmap.png', alt: 'SVG filter heatmap thumbnail' }
link: https://codepen.io/bbagg/pen/yLwWXvx
---

SVGs (and especially their filters) are really, *really* cool. I also tend to get injured doing Brazilian jiu-jitsu, *a lot*.

So I figured why not combine these two for a cool little code experiment.

When I learned about the `<feComponentTransfer>` filter and how it basically applies a gradient map to an image, the idea popped into my head to try a “heatmap” effect to see where my most common (and most severe) injuries were located. Best case, I learn what to strengthen up to prevent more injuries; worst case, I know what to watch out for in the future. 😅

The `<feComponentTransfer>` filter works like this:

```html
<svg>
    <!-- 1: Define your filter -->
    <filter id="heatmap">
        <!-- 2: Add the feComponentTransfer effect -->
        <feComponentTransfer>
            <!-- Add a function for each channel (red, green, blue, alpha) -->
            <feFuncR type="table" tableValues="0 1" />
            <feFuncG type="table" tableValues="0 1" />
            <feFuncB type="table" tableValues="0 1" />
            <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
    </filter>
</svg>
```

On each transfer function element (e.g. `<feFuncR>`) we set the `type="table"` attribute to tell the filter to do a linear interpolation between the values in the `tableValues` attribute. In practice, this basically means that the darkest areas of the image will have their red channel turned up or down according to that *first* value, and the lightest areas will do the same according to the *last* value.

Any values in between them also get interpolated (with `0` being the min and `1` being the max).

So for example, `<feFuncR type="table" tableValues="0 1 0"></feFuncR>` means “for black areas of the image, have no red color whatsoever, for halfway-bright areas of the image have maximum red, and for white areas of the image have no red again.” It'd look something like this:

(Will show three gradients here: one with the filter itself, one with an image, and one with the filter applied to the image)

(Next: embed an interactive widget for toying with the table values to show how they affect the final filter)

(Then: will talk about the process of building the final SVG and the CodePen demo itself... stay tuned!)