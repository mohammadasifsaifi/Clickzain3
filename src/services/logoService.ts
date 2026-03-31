export const generateLogo = async () => {
  try {
    const response = await fetch('/api/generate-logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    if (data.success) {
      return data.imageUrl;
    } else {
      throw new Error(data.message || 'Failed to generate logo');
    }
  } catch (error) {
    console.error("Error calling logo generation API:", error);
    return null;
  }
};
