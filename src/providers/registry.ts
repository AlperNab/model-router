import type { ComplexityFeatures } from "../router/complexity.js";
import type { RouterConfig, RouteDecision } from "../types.js";
const MODELS: Record<string,any> = {
  "gemini-2.0-flash-lite":    {provider:"google",    icp:0.000075, ocp:0.0003,  lat:800,  thr:0,  cap:["text","json"]},
  "claude-haiku-4-20250514":  {provider:"anthropic", icp:0.0008,   ocp:0.004,   lat:1200, thr:10, cap:["text","json","code"]},
  "gpt-4o-mini":              {provider:"openai",    icp:0.00015,  ocp:0.0006,  lat:1500, thr:10, cap:["text","json","code"]},
  "gemini-2.5-flash":         {provider:"google",    icp:0.00015,  ocp:0.0006,  lat:1800, thr:30, cap:["text","json","code","reasoning"]},
  "claude-sonnet-4-20250514": {provider:"anthropic", icp:0.003,    ocp:0.015,   lat:2500, thr:40, cap:["text","json","code","reasoning"]},
  "gpt-4o":                   {provider:"openai",    icp:0.0025,   ocp:0.01,    lat:2800, thr:40, cap:["text","json","code","reasoning"]},
  "claude-opus-4-20250514":   {provider:"anthropic", icp:0.015,    ocp:0.075,   lat:6000, thr:75, cap:["text","json","code","reasoning","agents"]},
};
export class ModelRegistry {
  constructor(private config: RouterConfig) {}
  selectModel(features: ComplexityFeatures, opts: any): RouteDecision {
    const candidates = Object.entries(MODELS)
      .filter(([,s]) => features.score >= s.thr && this.hasKey(s.provider) &&
        (!opts.max_latency_ms || s.lat <= opts.max_latency_ms) &&
        (!features.requires_code || s.cap.includes("code")))
      .sort(([,a],[,b]) => a.icp - b.icp);
    const [model, spec] = candidates[0] ?? Object.entries(MODELS).filter(([,s])=>this.hasKey(s.provider))[0];
    const reason = features.score < 30 ? "low complexity → cheapest model"
      : features.score < 60 ? "medium complexity → balanced" : "high complexity → capable model";
    return {model, provider: spec.provider, reason, complexity_score: features.score, estimated_cost_usd: 0};
  }
  getProvider(m: string) { return MODELS[m]?.provider ?? "unknown"; }
  calculateCost(m: string, i: number, o: number) {
    const s = MODELS[m]; return s ? i/1000*s.icp + o/1000*s.ocp : 0;
  }
  private hasKey(p: string) {
    return !!({anthropic:this.config.anthropic_key,openai:this.config.openai_key,google:this.config.google_key}[p]);
  }
}
