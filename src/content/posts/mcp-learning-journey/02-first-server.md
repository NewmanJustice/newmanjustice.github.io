---
title: "Building a first MCP server"
description: "Getting hands on — setting up the Python SDK, wiring up a minimal tool, and watching Claude Code actually use it."
pubDate: 2026-03-24
series: "mcp-learning-journey"
seriesOrder: 2
tags: ["ai", "mcp", "python", "tools"]
---

There is a particular satisfaction in the moment a tool you've written gets called by a model. This entry is about getting to that moment.

## Setup

The O'Reilly material uses the Python MCP SDK. The install is straightforward:

```bash
pip install mcp
```

A minimal server looks like this:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-first-server")

@mcp.tool()
def greet(name: str) -> str:
    """Return a greeting for the given name."""
    return f"Hello, {name}. Welcome to the protocol."

if __name__ == "__main__":
    mcp.run()
```

That's it. `FastMCP` handles the protocol negotiation, the tool registration, the JSON-RPC framing — all of it. You write the function, decorate it, and you have a tool.

## Wiring it to Claude Code

In `.claude/settings.json`, you add the server to the `mcpServers` block:

```json
{
  "mcpServers": {
    "my-first-server": {
      "command": "python",
      "args": ["server.py"]
    }
  }
}
```

Claude Code starts the server as a subprocess, negotiates capabilities via stdio, and from that point the tool is available in the session.

## What I noticed

The first thing that struck me was how fast the iteration loop is. Change the server, restart, and the model has a new capability. No redeployment, no rebuild — just a process restart.

The second thing was the docstring. The `"""Return a greeting..."""` isn't decoration. It becomes the tool description that the model reads when deciding whether to call this tool. Writing a good docstring is, in this context, a form of prompt engineering. That's a shift in how I think about documentation.

## Next

Moving beyond toy examples — building a server that does something genuinely useful, and thinking about what "useful" means in a context where the consumer is a model rather than a human.
