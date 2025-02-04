import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Share2 } from "lucide-react";

const TimeEstimator = () => {
  const [level, setLevel] = useState(1);

  const calculatePlaytime = (level: number) => {
    // Rough estimation based on average leveling time
    const baseTime = 2; // Base hours for level 1
    const timePerLevel = 1.5; // Average hours per level
    return Math.round(baseTime + (level - 1) * timePerLevel);
  };

  const getPlaytimeMessage = (hours: number) => {
    if (hours < 10) return "Still in the tutorial phase! 🌱";
    if (hours < 20) return "Getting serious about the grind! 💪";
    if (hours < 40) return "True dedication showing! 🎮";
    return "Wraeclast is their second home now! 🏰";
  };

  const handleShare = () => {
    const hours = calculatePlaytime(level);
    const text = `My partner has spent approximately ${hours} hours in Path of Exile 2 (Level ${level})! ${getPlaytimeMessage(hours)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'POE 2 Playtime Estimate',
        text: text,
      }).catch(() => {
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard!",
          description: "Share the gaming dedication with others!",
        });
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share the gaming dedication with others!",
      });
    }
  };

  const hours = calculatePlaytime(level);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-poe-purple to-poe-slate p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-poe-gold/20">
        <h1 className="text-3xl font-bold text-poe-gold mb-6 text-center animate-float">
          POE 2 Time Tracker
        </h1>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-white text-lg font-medium">
              Character Level: {level}
            </label>
            <Slider
              value={[level]}
              onValueChange={(value) => setLevel(value[0])}
              max={100}
              min={1}
              step={1}
              className="py-4"
            />
          </div>

          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-white">
              Estimated Playtime
            </h2>
            <p className="text-3xl font-bold text-poe-gold">
              {hours} hours
            </p>
            <p className="text-white/80 italic">
              {getPlaytimeMessage(hours)}
            </p>
          </div>

          <Button
            onClick={handleShare}
            className="w-full bg-poe-gold hover:bg-poe-gold/80 text-poe-slate font-semibold"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Result
          </Button>
        </div>

        <p className="text-white/60 text-sm mt-6 text-center">
          Note: This is a fun estimation tool. Actual playtime may vary based on
          gameplay style and efficiency.
        </p>
      </div>
    </div>
  );
};

export default TimeEstimator;