---
title: "What is MCP, actually?"
description: "Getting past the headline and understanding what the Model Context Protocol is doing at a protocol level — and why it matters."
pubDate: 2026-03-24
series: "mcp-learning-journey"
seriesOrder: 1
tags: ["ai", "mcp", "architecture"]
---

The first thing I noticed about MCP is how often it gets described by analogy rather than by what it actually is. "It's like USB for AI." "It's an API standard for tools." These aren't wrong, but they skip over the part that actually matters.

## The problem it solves

Before MCP, if you wanted a language model to interact with an external system — read a file, query a database, call an API — you had to solve this for every model, every tool, every integration, separately. There was no standard. Each team reinvented the same wheel in slightly different shapes.

MCP is a specification for that interface. It defines how a host (like Claude Code, or an IDE plugin) discovers and calls *tools* provided by a *server* — a lightweight process that exposes capabilities the model can use.

## The architecture in plain terms

Three roles:

**Host** — the application running the model. It manages the conversation, decides which tools to surface, and mediates all calls.

**Client** — lives inside the host, manages one connection to one MCP server.

**Server** — a process (local or remote) that exposes tools, resources, and prompts via the protocol.

The transport layer is deliberately simple: stdio for local servers, HTTP with Server-Sent Events for remote. The protocol itself is JSON-RPC 2.0.

## What struck me reading this

The elegance is in the separation. The model doesn't know anything about the server implementation. The server doesn't know anything about the model. The host mediates everything. This is a clean abstraction — and in my experience, clean abstractions are rare enough to be worth paying attention to.

The governance implication is also immediately obvious: because the host controls what tools are exposed, you have a single point of control for what a model is and isn't allowed to do. For HMCTS, that matters enormously.

## Next

In the next entry I'll start building — a simple local MCP server using the Python SDK, following the O'Reilly exercises.
