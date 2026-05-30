# Model Router — Standalone Real GUI Implementation

This folder is now its own runnable project app. It does not depend on the root all-project dashboard at runtime.

## Run

```bash
./run_gui.sh
```

Windows:

```powershell
.\run_gui_windows.ps1
```

Default URL: `http://127.0.0.1:9137`

## What is inside this project folder

- `app/` — FastAPI backend for this project.
- `static/` — elegant browser GUI.
- `plugins/model-router.json` — this project’s own feature/customization/input schema.
- `project_config.json` — readable copy of the same project-specific configuration.
- `data/` — local SQLite jobs, uploads, exports.
- `tests/` — verifies this project has a registered real local engine.

## Project-specific scope

- Domain: `AI Platform / Routing`
- Target user: `Domain operator, business owner, analyst, or team member who needs this workflow executed reliably.`
- Core job: Request → best model/provider
- Suite: `AI Platform Core`

## Deep features applied

- fallback routing
- cost/latency/quality scoring
- local/cloud policy
- retry logic
- prompt classification
- provider health checks
- audit logs

## Customization controls

- `execution_mode` — Execution mode (select)
- `provider_keys` — provider keys (text)
- `default_models` — default models (select)
- `privacy_mode` — privacy mode (select)
- `cost_cap` — cost cap (text)
- `latency_target` — latency target (text)
- `fallback_chain` — fallback chain (text)
- `task_routing_rules` — task routing rules (textarea)
- `output_format` — output format (select)
- `language` — language (select)
- `confidence_threshold` — Confidence threshold (slider)

## Input fields

- `request` — Request (text) required
- `work_brief` — Work brief / source text / URL / instructions (textarea) required

## External data policy

The local deterministic core is real and executable. Live external systems are not simulated. If Shopify, ATS, ERP, OCR/STT, maps, SERP, market data, medical databases, tax/customs databases, or other live systems are required, this project reports the missing connector/API requirement instead of inventing data.

---

## Final UX/UI Layer

This project now uses the **AI Platform Control Plane** pattern.

**UX workflow:** Provider/tool intake → routing/security → execution → audit/export

**Domain components:**
- Provider routing matrix
- Tool registry
- Cost/billing controls
- Security settings
- Audit trail

**Quick actions:**
- Configure providers
- Review routing rules
- Check security controls
- Export audit package

**No fake-data policy:** external/live actions require real connectors or API keys. Missing connectors are reported instead of simulated.
