function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/);
}

function calculateSimilarity(answer, reference) {
  const answerWords = normalizeText(answer);
  const referenceWords = normalizeText(reference);

  const referenceSet = new Set(referenceWords);
  const commonWords = answerWords.filter(word =>
    referenceSet.has(word)
  );

  return commonWords.length / referenceSet.size;
}

export function validateTeacherAnswer(teacherAnswer, aiAnswer) {
  const similarityScore = calculateSimilarity(
    teacherAnswer,
    aiAnswer
  );

  return {
    similarityScore,
    isApproved: similarityScore >= 0.6, // tweak if needed
    message:
      similarityScore >= 0.6
        ? 'Teacher answer aligns with AI reference'
        : 'Teacher answer deviates from AI reference'
  };
}
