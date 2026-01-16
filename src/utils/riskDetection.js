const riskRules = [
  {
    id: 'prompt_injection',
    name: 'Prompt Injection Attempt',
    keywords: ['ignore previous', 'disregard', 'new instructions', 'system prompt', 'forget everything', 'override'],
    severity: 85,
  },
  {
    id: 'code_injection',
    name: 'Code Injection Pattern',
    keywords: ['<script>', 'eval(', 'exec(', 'system(', 'shell', 'rm -rf', 'drop table'],
    severity: 90,
  },
  {
    id: 'sql_injection',
    name: 'SQL Injection Pattern',
    keywords: ["' or '1'='1", "'; drop", 'union select', '-- ', 'or 1=1'],
    severity: 85,
  },
  {
    id: 'sensitive_data',
    name: 'Sensitive Data Exposure',
    keywords: ['password', 'api key', 'secret', 'token', 'credentials', 'private key'],
    severity: 80,
  },
  {
    id: 'jailbreak',
    name: 'Jailbreak Attempt',
    keywords: ['dan mode', 'developer mode', 'pretend you are', 'act as if', 'roleplay as'],
    severity: 75,
  },
  {
    id: 'excessive_length',
    name: 'Excessive Input Length',
    check: (text) => text.length > 2000,
    severity: 40,
  },
  {
    id: 'repeated_chars',
    name: 'Suspicious Repetition',
    check: (text) => /(.)\1{15,}/.test(text),
    severity: 45,
  },
];

export function analyzeAnswer(answer, modelAnswer) {
  const answerText = answer.toLowerCase();
  const modelText = (modelAnswer || '').toLowerCase();

  const triggeredRules = [];
  let maxSeverity = 0;
  let relevanceScore = 50;

  riskRules.forEach((rule) => {
    let triggered = false;
    let matches = [];

    if (rule.keywords) {
      rule.keywords.forEach((keyword) => {
        if (answerText.includes(keyword.toLowerCase())) {
          triggered = true;
          matches.push(keyword);
        }
      });
    }

    if (rule.check && rule.check(answer)) {
      triggered = true;
      matches.push('Pattern detected');
    }

    if (triggered) {
      triggeredRules.push({
        id: rule.id,
        name: rule.name,
        severity: rule.severity,
        matches: matches,
      });
      maxSeverity = Math.max(maxSeverity, rule.severity);
    }
  });

  if (modelAnswer) {
    const answerWords = answerText.split(/\s+/).length;
    const modelWords = modelText.split(/\s+/).length;
    const wordDiff = Math.abs(answerWords - modelWords);

    if (wordDiff < 20 && answerText.includes(modelText.substring(0, 30))) {
      relevanceScore = 85 + Math.random() * 10;
    } else if (answerText.includes(modelText.substring(0, 20))) {
      relevanceScore = 70 + Math.random() * 15;
    } else {
      relevanceScore = 45 + Math.random() * 25;
    }
  }

  const riskScore = maxSeverity;
  let riskLevel;
  let riskColor;

  if (riskScore >= 80) {
    riskLevel = 'Blocked';
    riskColor = 'red';
  } else if (riskScore >= 50) {
    riskLevel = 'Suspicious';
    riskColor = 'yellow';
  } else {
    riskLevel = 'Safe';
    riskColor = 'green';
  }

  return {
    riskLevel,
    riskScore,
    riskColor,
    triggeredRules,
    relevanceScore: Math.round(relevanceScore),
    answerLength: answer.length,
    timestamp: new Date().toISOString(),
    validationId: `VAL-${Date.now()}`,
  };
}

export function generateValidationLog(analysis) {
  const logs = [];

  logs.push({
    type: 'info',
    message: `Shadow validation started - Input length: ${analysis.answerLength} characters`,
  });

  if (analysis.triggeredRules.length > 0) {
    logs.push({
      type: 'warning',
      message: `Detected ${analysis.triggeredRules.length} security pattern(s)`,
    });

    analysis.triggeredRules.forEach((rule) => {
      logs.push({
        type: 'warning',
        message: `${rule.name} - Severity: ${rule.severity}%`,
        detail: rule.matches.join(', '),
      });
    });
  } else {
    logs.push({
      type: 'success',
      message: 'No security patterns detected',
    });
  }

  logs.push({
    type: 'info',
    message: `Risk assessment: ${analysis.riskLevel}`,
  });

  logs.push({
    type: 'info',
    message: `Relevance score: ${analysis.relevanceScore}%`,
  });

  logs.push({
    type: 'success',
    message: 'Shadow validation completed successfully',
  });

  return logs;
}
