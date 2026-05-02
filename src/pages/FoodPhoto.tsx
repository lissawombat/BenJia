import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Sparkles, Camera, Loader2, Image as ImageIcon } from 'lucide-react';
import { LanguageContext } from '../App';
import { supabase } from '../supabase/client';

const PROMPT_TEMPLATE_ZH = `生成一张韩国咖啡馆风格的时尚照片。像是用智能手机拍摄的、适合发到Instagram的照片。然后，观察照片中出现的元素，并为每个元素添加有意义的手绘注释。

【描写规则】
•像用白色笔画出那样的细手绘线条
•一笔写成风格的粗糙、略微不均匀
• 像描摹物体外周那样添加轮廓线
•用箭头或虚线制造视线引导

【文本规则】
•韩语手写文字（韩语7成、英文3成）
• 简短，像自言自语一样的评论
•语气是"日记•一言•情感寄托"

【评论生成规则】
•饮料-味道•溫度• 心情（例：清爽、温柔的甜味）
•食物 口感•美味（例：湿润、最高）
•空间 氛围（例：放松、美好时光）
•整体 一言总结（例：幸福过头了～）

【装饰】
•蒸汽、闪闪发光、心形、小表情符号等适度添加
•不过度，留出"空白"

【完成风格】
• Instagram 故事风、杂志的粗糙笔记风 •时尚且轻松的氛围`;

const PROMPT_TEMPLATE_EN = `Generate a stylish Korean cafe-style photo. Like a smartphone photo suitable for Instagram. Then observe the elements in the photo and add meaningful hand-drawn annotations for each element.

【Drawing Rules】
• Fine hand-drawn lines like white pen strokes
• Rough, slightly uneven one-stroke style
• Add outline contours around objects
• Use arrows or dashed lines to guide the eye

【Text Rules】
• Korean handwritten text (70% Korean, 30% English)
• Short, diary-like comments
• Tone: "diary • one-liner • emotional expression"

【Comment Generation Rules】
• Drinks - taste • temperature • mood (e.g., refreshing, gentle sweetness)
• Food - texture • deliciousness (e.g., moist, the best)
• Space - atmosphere (e.g., relaxing, good times)
• Overall - one-line summary (e.g., too happy~)

【Decorations】
• Steam, sparkles, hearts, small emojis added moderately
• Not excessive, leave "white space"

【Final Style】
• Instagram story style, magazine rough note style • fashionable and relaxed atmosphere`;

export default function FoodPhotoPage() {
  const { lang } = React.useContext(LanguageContext);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxSize = 4096;
          
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Canvas toBlob failed'));
              }
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setError(lang === 'zh' ? '图片大小不能超过5MB' : 'Image size cannot exceed 5MB');
      return;
    }

    try {
      setError(null);
      const compressed = await compressImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(compressed);
    } catch (err) {
      setError(lang === 'zh' ? '图片处理失败' : 'Image processing failed');
    }
  }, [lang, compressImage]);

  const generateStyledPhoto = useCallback(async () => {
    if (!uploadedImage) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 调用 Edge Function 进行图像编辑
      const prompt = lang === 'zh' ? PROMPT_TEMPLATE_ZH : PROMPT_TEMPLATE_EN;
      const { data, error } = await supabase.functions.invoke('ai-image-edit', {
        body: {
          image: uploadedImage,
          prompt: prompt,
        },
      });

      if (error) {
        throw error;
      }

      setGeneratedImage(data.imageUrl);
    } catch (err) {
      console.error('Generation error:', err);
      setError(lang === 'zh' ? '生成失败，请重试' : 'Generation failed, please try again');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, lang]);

  const downloadImage = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `benjia-food-photo-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage]);

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === 'zh' ? '漂亮饭照片' : 'Food Photo Studio'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            {lang === 'zh' 
              ? '上传你的美食照片，AI会为你生成韩国咖啡馆风格的时尚照片，带有手绘注释和装饰' 
              : 'Upload your food photo, AI will generate a Korean cafe-style trendy photo with hand-drawn annotations'}
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-burgundy/30 rounded-2xl p-8 sm:p-12 text-center cursor-pointer hover:border-burgundy/50 transition-colors bg-white/50"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center">
                <Camera className="w-8 h-8 text-burgundy" />
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-1">
                  {lang === 'zh' ? '点击上传照片' : 'Click to upload photo'}
                </p>
                <p className="text-gray-400 text-sm">
                  {lang === 'zh' ? '支持 JPG、PNG、HEIC 格式' : 'Supports JPG, PNG, HEIC formats'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Preview & Generate */}
        {uploadedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-burgundy" />
                {lang === 'zh' ? '预览' : 'Preview'}
              </h3>
              <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={generateStyledPhoto}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-burgundy text-cream px-8 py-3 rounded-full font-medium hover:bg-burgundy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {lang === 'zh' ? '生成中...' : 'Generating...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {lang === 'zh' ? '生成漂亮饭照片' : 'Generate Styled Photo'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Generated Result */}
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-burgundy" />
                {lang === 'zh' ? '生成结果' : 'Result'}
              </h3>
              <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={downloadImage}
                  className="inline-flex items-center gap-2 bg-burgundy text-cream px-8 py-3 rounded-full font-medium hover:bg-burgundy-light transition-colors"
                >
                  <Download className="w-5 h-5" />
                  {lang === 'zh' ? '保存照片' : 'Save Photo'}
                </button>
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setGeneratedImage(null);
                    setError(null);
                  }}
                  className="inline-flex items-center gap-2 border-2 border-burgundy text-burgundy px-8 py-3 rounded-full font-medium hover:bg-burgundy/5 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  {lang === 'zh' ? '上传新照片' : 'Upload New'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
        >
          {[
            { icon: '🎨', title: lang === 'zh' ? '手绘风格' : 'Hand-drawn Style', desc: lang === 'zh' ? '韩国咖啡馆风' : 'Korean Cafe Style' },
            { icon: '✨', title: lang === 'zh' ? '智能注释' : 'Smart Annotations', desc: lang === 'zh' ? '自动添加文字' : 'Auto Text' },
            { icon: '📸', title: lang === 'zh' ? 'Instagram风' : 'Instagram Style', desc: lang === 'zh' ? '适合分享' : 'Share Ready' },
            { icon: '💝', title: lang === 'zh' ? '可爱装饰' : 'Cute Decorations', desc: lang === 'zh' ? '心形表情' : 'Hearts & Emojis' },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white/50 rounded-xl"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
