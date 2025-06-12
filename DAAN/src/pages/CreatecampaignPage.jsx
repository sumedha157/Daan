import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, LoaderCircle, Lightbulb, DollarSign, Tag, FileText } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

const CreateCampaignPage = () => {
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the AI description generation using the Gemini API.
   */
  const handleGenerateDescription = async () => {
    if (!title || !promptText) {
      setError("Please provide a campaign title and a brief summary before generating.");
      return;
    }
    setError(null);
    setIsLoading(true);

    const prompt = `
      You are an expert copywriter for a crowdfunding platform called FundHope.
      Your task is to write a compelling and persuasive campaign description.
      
      Campaign Title: "${title}"
      
      Core Idea: "${promptText}"

      Please write a description that is optimistic, inspiring, and clearly explains the project's purpose. It should be at least 3 paragraphs long. Start with an engaging hook, explain the problem and your solution, and end with a strong call to action that encourages people to donate and share the campaign. Use Markdown for formatting, like headings and bold text.
    `;

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = ""; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const text = result.candidates[0].content.parts[0].text;
        setDescription(text);
      } else {
        console.error("No content found in API response:", result);
        setError("The AI assistant couldn't generate a description. Please try again.");
      }
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError("An error occurred while contacting the AI assistant. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Start Your Campaign</h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-2">Bring your idea to life with the support of the community.</p>
        </div>

        <Card className="p-6 sm:p-8">
          <form className="space-y-6">
            {/* Step 1: Core Idea */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500"/> 1. The Big Idea
                </h3>
                <div className='space-y-4'>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Campaign Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Community Garden for our Neighborhood"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Briefly describe your campaign's goal.
                        </label>
                        <textarea
                            id="prompt"
                            rows="3"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="e.g., To build a garden where local families can grow their own fresh vegetables and connect with each other."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                        />
                         <p className="text-xs text-gray-500 mt-1">This will be used by the AI to help write your full description.</p>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Step 2: The Story */}
            <div>
                 <h3 className="font-bold text-lg mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500"/> 2. Your Story
                </h3>
                 <div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                           Campaign Description
                         </label>
                         <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isLoading}>
                             {isLoading ? (
                                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                             ) : (
                                <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                             )}
                             ✨ Generate with AI
                         </Button>
                    </div>
                    {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
                    <textarea
                        id="description"
                        rows="12"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell your story... Why is this project important? Who will it help?"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            
            {/* Step 3: Funding */}
            <div>
                 <h3 className="font-bold text-lg mb-2 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500"/> 3. Funding
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Funding Goal ($)</label>
                        <input
                            type="number"
                            id="goal"
                            placeholder="5000"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select
                            id="category"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                        >
                            <option>Health</option>
                            <option>Education</option>
                            <option>Environment</option>
                            <option>Technology</option>
                            <option>Community</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                 <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Launch Campaign
                 </Button>
            </div>

          </form>
        </Card>
      </div>
    </main>
  );
};

export default CreateCampaignPage;
