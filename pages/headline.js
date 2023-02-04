import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import Link from 'next/link'

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    // next.jsなので自動ルーティング
    const response = await fetch('/api/generate_chain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>create blog articles</h1>
          </div>
          <div className="header-subtitle">
            <h2>見出しから詳細まで</h2>
          </div>
          <Link href="/" legacyBehavior>
            <a>👉home</a>
          </Link>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="ビットコインのマイニング"
          value={userInput}
          onChange={onUserChangedText}
        />;
      </div>
      <div className="prompt-buttons">
        <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
            {/* 応答が返ってくるまでくるくる表示 */}
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
      </div>
  
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;