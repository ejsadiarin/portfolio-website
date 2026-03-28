---
title: "Operating a K3s Homelab With GitOps"
description: "How I run a production-style homelab using ArgoCD, IaC, and layered observability."
pubDate: 2026-01-15
updatedDate: 2026-02-01
tags:
  - "homelab"
  - "gitops"
  - "k3s"
  - "argocd"
draft: false
image: "/images/blog/homelab-gitops-k3s.jpg"
---

My homelab is a training ground for production engineering discipline.
I use GitOps and infrastructure-as-code to reduce drift and keep operations repeatable.

This write-up covers deployment workflows, security boundaries, and how observability
reduced mean time to recovery across self-hosted services.
