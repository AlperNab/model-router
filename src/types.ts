export interface RouterConfig {
  anthropic_key?: string;
  openai_key?: string;
  google_key?: string;
  default_max_tokens?: number;
  enable_logging?: boolean;
}
export interface RouteDecision {
  model: string; provider: string; reason: string;
  complexity_score: number; estimated_cost_usd: number;
}
