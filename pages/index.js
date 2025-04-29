import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ReviewGenerator() {
  const [form, setForm] = useState({
    service: '',
    location: '',
    problem: '',
    experience: '',
    result: '',
    recommend: ''
  });
  const [generatedReview, setGeneratedReview] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateReview = () => {
    const { service, location, problem, experience, result, recommend } = form;
    const review = `I hired Beacon of Hope Restorations to help with ${service}. They came out to our property in ${location} because we had ${problem}. The team was ${experience}. They ${result}. I’d definitely recommend Beacon of Hope Restorations to anyone looking for ${recommend}.`;
    setGeneratedReview(review);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReview);
    setCopied(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold text-[#16234a]">Write Your Review</h2>
          <Input name="service" placeholder="What service did you receive?" onChange={handleChange} />
          <Input name="location" placeholder="Where are you located?" onChange={handleChange} />
          <Input name="problem" placeholder="What was the issue or need?" onChange={handleChange} />
          <Input name="experience" placeholder="How was the experience?" onChange={handleChange} />
          <Input name="result" placeholder="What was the outcome?" onChange={handleChange} />
          <Input name="recommend" placeholder="Why would you recommend them?" onChange={handleChange} />
          <Button onClick={generateReview} className="bg-[#f99e1c] text-white">Generate Review</Button>
        </CardContent>
      </Card>

      {generatedReview && (
        <Card>
          <CardContent className="space-y-4">
            <h3 className="font-semibold mb-2 text-[#16234a]">Your Review:</h3>
            <Textarea value={generatedReview} readOnly rows={6} className="w-full" />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} className="bg-[#f99e1c] text-white">
                {copied ? 'Copied!' : 'Copy Review'}
              </Button>
              <Button asChild variant="outline">
                <a href="https://g.page/r/CTe8BgBrT3zlEBM/review" target="_blank" rel="noopener noreferrer">
                  Open Google to Leave Review
                </a>
              </Button>
            </div>
            <p className="text-sm mt-2">You can paste your review on Google, and soon on Yelp and Trustpilot too.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
