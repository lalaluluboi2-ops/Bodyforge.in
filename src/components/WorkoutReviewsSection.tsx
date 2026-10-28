import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Flag, 
  CheckCircle2, 
  AlertCircle,
  User
} from 'lucide-react';
import { WorkoutReview, DifficultyLevel } from '../types';
import { fetchWorkoutReviews, saveWorkoutReview } from '../services/firebase';

interface WorkoutReviewsSectionProps {
  workoutId: string;
  workoutTitle: string;
  currentUserId: string;
  currentUserName: string;
}

export const WorkoutReviewsSection: React.FC<WorkoutReviewsSectionProps> = ({
  workoutId,
  workoutTitle,
  currentUserId,
  currentUserName
}) => {
  const [reviews, setReviews] = useState<WorkoutReview[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [difficultyFelt, setDifficultyFelt] = useState<DifficultyLevel>('Intermediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [reportedIds, setReportedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchWorkoutReviews(workoutId).then(setReviews);
  }, [workoutId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newReview: WorkoutReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      workoutId,
      workoutTitle,
      userId: currentUserId || 'athlete_user',
      userName: currentUserName || 'Verified Athlete',
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      difficultyFelt,
      likes: 1
    };

    await saveWorkoutReview(newReview);
    setReviews(prev => [newReview, ...prev]);
    setComment('');
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const handleReport = (reviewId: string) => {
    setReportedIds(prev => [...prev, reviewId]);
    alert('Thank you for reporting this issue. Our safety moderators have been notified.');
  };

  // Average Rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-6 pt-6 border-t border-charcoal-800 text-gray-100">
      {/* Header & Overall Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-forge-lime" />
            <span>Athlete Reviews & Community Feedback</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Real feedback from athletes training zero-equipment calisthenics
          </p>
        </div>

        <div className="flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 px-3.5 py-1.5 rounded-2xl">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-mono font-black text-white">{avgRating}</span>
          <span className="text-xs text-gray-500 font-mono">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3.5">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Rate & Review This Workout
        </h4>

        {/* Star Selection */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Your Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-amber-400 hover:scale-110 transition-transform"
                aria-label={`Rate ${star} star`}
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-forge-lime ml-1">
            {rating} of 5 Stars
          </span>
        </div>

        {/* Perceived Difficulty Selector */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-gray-400">Difficulty Felt:</span>
          {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map(level => (
            <button
              type="button"
              key={level}
              onClick={() => setDifficultyFelt(level)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                difficultyFelt === level
                  ? 'bg-forge-lime text-black font-bold'
                  : 'bg-charcoal-950 border border-charcoal-800 text-gray-400 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience: How were the form cues? Did you feel the muscle engagement? Any tips for other athletes?"
          className="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-forge-lime resize-none"
        />

        {submittedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Your review has been published to the community!</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-forge-lime hover:bg-forge-lime-hover disabled:bg-charcoal-800 disabled:text-gray-500 text-black font-bold text-xs flex items-center gap-2 shadow-forge-glow transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
          </button>
        </div>
      </form>

      {/* Community Reviews List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-xs font-bold text-forge-lime">
                  {rev.userName[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.userName}</span>
                    {rev.difficultyFelt && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-charcoal-800 text-gray-400">
                        {rev.difficultyFelt}
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {new Date(rev.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Star Rating Badge */}
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed pl-9">
              {rev.comment}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-charcoal-850 pl-9 text-[10px] text-gray-500">
              <span className="flex items-center gap-1 text-gray-400">
                <ThumbsUp className="w-3 h-3 text-forge-lime" />
                <span>{rev.likes || 1} found helpful</span>
              </span>

              <button
                onClick={() => handleReport(rev.id)}
                disabled={reportedIds.includes(rev.id)}
                className="hover:text-red-400 flex items-center gap-1 transition-colors"
                title="Report inappropriate review"
              >
                <Flag className="w-3 h-3" />
                <span>{reportedIds.includes(rev.id) ? 'Reported' : 'Report'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
