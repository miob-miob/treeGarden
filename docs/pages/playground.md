# Playground for extensions
### admotion

> what is it for? 
> Its obvious from example

!!! failure "optional explicit title within double quotes"

!!! note "Remember this!!"

!!! danger "Kamo toto fakt nedelej!"
    um dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non conse

!!! important "IMportant stuff"
    Bobijsdnfj nsdkfjnsdkfjnsdkfjnskdjfnk

???- example "Do you wanna to know more?"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

??? info "More information"
    Sulino kokoska

??? bug "More information"
    Sulino kokoska


---

### abbr
> What it is for?   - hower for long time to see it fully!

The HTML specification
is maintained by the W3C.

*[HTML]: Hyper Text Markup Language dooopkoku!
*[W3C]:  World Wide Web Consortium

---

### attr_list
> what is it for?
> You can define classes, ids + other elements on html -> for styling later 

This is a paragraph.
{: #an_id .a_class }

[link](http://example.com){: class="foo bar" title="Some title!" id="susu" }

---

### footnotes
> what is this for? Obvious



Footnotes[^1] have a label[^2] and the footnote's content.

[^1]: This is a footnote content.

[^2]: A footnote on the label

---

### Icons + emojis
> nice one!!!

 in middle of text :material-check:  and lot of :palm_tree: and something more
:material-close: :heart_eyes: :black_cat: :spider:

for more use [search](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#search)

---



### diagrams

> this is uber coool - simple diagrams as code

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B --------->|No| E[Yay!];
```

``` mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

---

### math equations
> hope i will not need this - but it is nice!!!

$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$

The homomorphism $f$ is injective if and only if its kernel is only the
singleton set $e_G$, because otherwise $\exists a,b\in G$ with $a\neq b$ such
that $f(a)=f(b)$.

---
