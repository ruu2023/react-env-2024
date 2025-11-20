import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedMusic, setGeneratedMusic] = useState();

  const handleGenerate = async () => {
    const apiKey = import.meta.env.VITE_LOUDLY_API_KEY;

    try {
      const formData = new FormData();
      const musicPrompt = `Create a ${genre} song titled "${title}". Music style: ${prompt}. High quality production with clear melody and rythm.`;
      formData.append('prompt', musicPrompt);
      formData.append('duration', '30');
      const response = await axios.post(
        'https://soundtracks.loudly.com/api/ai/prompt/songs',
        formData,
        {
          headers: {
            'API-KEY': apiKey,
          },
        },
      );

      if (response.data && response.data.music_file_path) {
        setGeneratedMusic(response.data.music_file_path);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    if (!generatedMusic) {
      alert('音楽生成してから保存してください');
      return;
    }
    const musicData = {
      id: Date.now().toString(),
      title: title,
      genre: genre,
      prompt,
      audioUrl: generatedMusic,
      coverUrl: `https://picsum.photos/400/400?random=${Date.now()}`,
    };

    const savedMusic = JSON.parse(
      localStorage.getItem('generatedMusic') || '[]',
    );

    savedMusic.push(musicData);
    localStorage.setItem('generatedMusic', JSON.stringify(savedMusic));

    alert('保存しました。');
  };

  return (
    <div>
      <h1>音楽作成ページ</h1>
      <div>
        <div>
          <label htmlFor="title">楽曲タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="楽曲のタイトルを入力"
          />
        </div>
        <div>
          <label htmlFor="genre">ジャンル</label>
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">ジャンルを選択</option>
            <option value="electronic">エレクトロニック</option>
            <option value="jazz">ジャズ</option>
            <option value="classic">クラシック</option>
            <option value="ambient">アンビエント</option>
            <option value="rock">ロック</option>
            <option value="pop">ポップ</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="prompt">音楽の説明</label>
        <textarea
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="どんな音楽を作りたいか説明を入れてください。"
        />
      </div>

      <button onClick={handleGenerate}>音楽を生成</button>

      {generatedMusic && (
        <div>
          <h3>生成された音楽</h3>
          <audio controls>
            <source src={generatedMusic} type="audio/mpeg" />
          </audio>
          <button onClick={() => handleSave()}>保存</button>
        </div>
      )}

      {/* material ui */}
      <div>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Typography variant="h1" mt={2}>
          こんにちは
        </Typography>
        <HomeIcon />
      </div>
    </div>
  );
};

export default CreatePage;
