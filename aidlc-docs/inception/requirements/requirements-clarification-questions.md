# Requirements Clarification Questions

I detected an area that needs clarification regarding the Resiliency extension choice:

## Clarification 1: Resiliency Extension Scope

You opted to enable the Resiliency Baseline extension (Answer: A on Q10). However, this project is a **locally-run terminal game** — not a deployed cloud service. Most resiliency rules (multi-zone deployment, auto-scaling, DR strategy, health checks, CI/CD pipelines, incident response) are designed for production cloud workloads and would be N/A for a local terminal application.

### Clarification Question 1
Given that this is a terminal game running locally on a user's machine (no cloud deployment, no persistent server, no multi-user infrastructure), would you like to:

A) Keep Resiliency enabled — apply only the rules that are applicable to a local application (graceful error handling, dependency isolation/timeouts, input validation). Most rules will be marked N/A.

B) Disable Resiliency — skip the extension entirely since this is not a cloud-deployed workload.

C) Other (please describe after [Answer]: tag below)

[Answer]: A
