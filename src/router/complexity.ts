export interface ComplexityFeatures {
  score: number; requires_reasoning: boolean; requires_code: boolean;
  requires_json: boolean; requires_long_output: boolean;
  estimated_input_tokens: number; is_multilingual: boolean; has_math: boolean;
}
export class ComplexityScorer {
  score(prompt: string, opts: any = {}): ComplexityFeatures {
    let score = 0;
    const lower = prompt.toLowerCase();
    const words = prompt.split(/\s+/).length;
    score += Math.min(words / 10, 20);
    const reasoning = ["analyze","compare","evaluate","critique","explain why","reason","trade-off"];
    const reasoningHits = reasoning.filter(s => lower.includes(s)).length;
    score += reasoningHits * 5;
    const code = ["code","function","implement","debug","refactor","algorithm","sql","typescript","python"];
    const codeHits = code.filter(s => lower.includes(s)).length;
    score += codeHits * 4;
    const hasMath = /\d+[\+\-\*\/\^]\d+|integral|derivative|matrix/.test(prompt);
    if (hasMath) score += 15;
    const requiresJson = opts.require_json ?? (lower.includes("json") || lower.includes("structured"));
    if (requiresJson) score += 5;
    const requiresLong = (opts.max_tokens ?? 0) > 2000 || lower.includes("comprehensive") || lower.includes("detailed");
    if (requiresLong) score += 10;
    const isMultilingual = /arabic|french|spanish|chinese|german/.test(lower);
    if (isMultilingual) score += 8;
    return {
      score: Math.min(Math.round(score), 100), requires_reasoning: reasoningHits > 0,
      requires_code: codeHits > 0 || !!opts.require_code, requires_json: !!requiresJson,
      requires_long_output: requiresLong, estimated_input_tokens: Math.ceil(words * 1.3),
      is_multilingual: isMultilingual, has_math: hasMath,
    };
  }
}
