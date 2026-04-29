---
title: Is User Centered Design Dead? 
description: User Centred Design assumes a human is on the other end. That assumption is eroding — and service design hasn't caught up.
pubDate: 2026-04-29
series: agent-centered-design
seriesOrder: 1
tags: [design, AI, agents, government, accessibility]
---

I was in a presentation about AI-assisted design tooling. The presentation enthusiastically displayed and demoed, and rightly so, the ability to move from idea to working prototype much, much faster with AI assistance. But something nagged at me throughout. The conversation was entirely about how AI could help designers work faster and better. I couldn't help but think... are we designing and thinking about the right thing?

## The Shift

The assumption built into most digital service design is that a human being is on the other end. A person with a screen, a keyboard, a browser, a set of cognitive limitations and accessibility needs. User Centred Design is built around understanding that person — their mental models, their context, their journey through a service.

That assumption is starting to erode.

Agentic AI tooling — software that acts on behalf of users, navigating services, completing tasks, making requests — is no longer a developer curiosity. It is being built into consumer devices. It is becoming a feature of operating systems and phones. The practical implication is that for a growing proportion of interactions with digital services, the entity making the request will not be a human sitting at a browser. It will be an agent, acting on that human's behalf.

That is a different kind of user that current design practice doesn't accommodate for.

## Agent Centred Design

What would it mean to design services with agents as a first-class consideration?

It is not about abandoning human-centred thinking — humans are still the ultimate stakeholders but it does mean asking a different set of questions during design. Can an agent reliably understand what this service does and what it needs? Is the service's structure legible to something that cannot see a visual layout or infer context from whitespace? Are the interaction patterns predictable enough that an agent can complete a task without the kind of error recovery that works for humans and breaks for automated processes?

This is not a distant problem. When agentic tooling becomes a mainstream way that people interact with services — and the trajectory of consumer technology suggests it will — then services designed only for human perception may not be the most efficient for this technology. The question is what designing for agents actually requires.

## Designing for a Different Kind of Reader

The mental model shift required is more fundamental than it first appears. Human-centred design is built around perception and cognition — can a person see this, understand it, navigate it without getting lost? Agent-centred design asks a different set of questions: can a machine find this, parse it, and act on it reliably?

That distinction has practical consequences for how services are built. An agent doesn't infer meaning from visual hierarchy or whitespace. It can't lean on layout to understand what matters most on a page. What it needs is information that is structured, unambiguous, and described in plain language — not just for readability, but because that is how language models process meaning. A field labelled clearly, a process described completely, a constraint stated explicitly: these are not nice-to-haves. They are the conditions under which an agent can operate correctly.

The GDS design principle of "one thing per page" is a useful illustration of where the two modes diverge. For a human encountering an unfamiliar process, that pattern is genuinely helpful — it reduces cognitive load, guides attention, and prevents errors by keeping the task narrow and focused. For an agent, the same pattern is actively obstructive. An agent doesn't need to be guided through steps one at a time; it needs to understand the whole shape of the interaction before it can act. What fields exist. What the dependencies are. What constitutes a valid input. Drip-feeding context step by step isn't kindness — it's a structural barrier.

Human-centred design optimises for guided discovery. Agent-centred design optimises for complete context, upfront.

This suggests that the design process itself may need a new kind of artefact alongside the familiar journey map and service blueprint. Something that defines, explicitly, what an agent needs to be able to do — what the capability contract of the service is. Whether that becomes a standard part of how services are specified, and who is responsible for producing it, is an open question. But it may be worth asking: should every service design process now produce one?

## The Government Question

This has a particular edge when it comes to government services.

The reason paper processes still exist alongside digital ones is not inertia — it is obligation. Not everyone has reliable internet access, or the confidence to navigate digital services, or the hardware to use them. The principle is that a citizen's ability to interact with their government should not depend on their access to a particular technology. That is a serious commitment, and it has real operational cost.

## The Accessibility Question

If agentic assistants become a mainstream feature of consumer devices — subsidised, bundled, ubiquitous in the way that smartphones now are — the question of accessibility starts to look different. A citizen who cannot confidently navigate a complex digital service — because of disability, limited digital literacy, or simply the cognitive load of a stressful situation — might be able to do so through an agent acting on their behalf. That is a genuine opportunity, and it would be wrong to dismiss it.

But the same dynamic that creates the opportunity also creates the pitfall, and they arrive together.

The most capable agents will not be equally distributed. They will be bundled with premium devices, tied to subscriptions, optimised for users who are already confident and well-resourced. The people most likely to struggle with complex government services are also the least likely to have access to the best tools. A two-tier system of agent quality is not a hypothetical — it is the default trajectory of consumer technology.

There is also a new kind of literacy gap opening up. The old question was: can this person use a website? The new question is: can this person use an agent effectively — know what to ask it, understand what it has done, catch it when it gets something wrong? That is a different skill, and it will not be evenly distributed either.

The third risk is quieter but potentially the most consequential for government. If agent-mediated interactions become the norm, there is a real pressure — not always explicit — for designers and commissioners to optimise for that path. The human-navigable route starts to receive less attention, less testing, less investment. It becomes a maintained fallback in the same way paper forms are maintained fallbacks: technically available, practically deprioritised. For a commercial service that is a product decision. For a government service it is a question of whether the obligation to serve every citizen is being honoured or merely discharged on paper.

The shift to agent-mediated access does not resolve the accessibility challenge. It transforms it — and the transformation produces new inequalities at the same time as it removes old ones. Designing for that honestly means holding both possibilities in view, not just the optimistic one.

## What Comes Next

User Centred Design is not wrong. It is incomplete — and the gap is growing.

The questions this shift raises do not yet have settled answers. What does agent-friendly service design actually look like in practice? What goes into a capability contract, and who is qualified to write one? How do you test a service for agent-readiness the way you currently test it for accessibility? These are open questions, and anyone who tells you otherwise is ahead of the evidence.

But the absence of answers is not a reason to wait. The services being designed now will be operating in a world where agent-mediated access is commonplace. The architecture decisions being made today will determine whether those services are ready for it — or whether they quietly exclude a new category of user while appearing to serve everyone.

For government in particular, that is not an abstract concern. The obligation to serve citizens does not have a carve-out for technological transition. If the design profession does not start asking what agent-centred service design means — now, before the patterns are set — the decisions will get made anyway. They will just get made by default, in code, by people who may not know they are making them.
