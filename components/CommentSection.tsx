"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { ThumbsUp, Smile } from "lucide-react";

interface Reaction {
    emoji: string;
    count: number;
}

interface Comment {
    id: number;
    name: string;
    text: string;
    date: string;
    likes: number;
    replies: Comment[];
    reactions: Reaction[];
}

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([]);

    // Main form state
    const [formData, setFormData] = useState({ name: "", email: "", comment: "" });

    // Reply form state
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyData, setReplyData] = useState({ name: "", email: "", comment: "" });

    // Reaction picker state
    const [reactingTo, setReactingTo] = useState<number | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const AVAILABLE_REACTIONS = ["❤️", "😂", "😮", "😢", "🔥", "👏"];

    // Helper to traverse and update comments
    const updateCommentTree = (list: Comment[], targetId: number, updateFn: (c: Comment) => Comment): Comment[] => {
        return list.map(comment => {
            if (comment.id === targetId) {
                return updateFn(comment);
            } else if (comment.replies.length > 0) {
                return { ...comment, replies: updateCommentTree(comment.replies, targetId, updateFn) };
            }
            return comment;
        });
    };

    const addReply = (parentId: number, newReply: Comment, commentsList: Comment[]): Comment[] => {
        return commentsList.map(comment => {
            if (comment.id === parentId) {
                return { ...comment, replies: [...comment.replies, newReply] };
            } else if (comment.replies.length > 0) {
                return { ...comment, replies: addReply(parentId, newReply, comment.replies) };
            }
            return comment;
        });
    };

    const countComments = (list: Comment[]): number => {
        return list.reduce((acc, comment) => acc + 1 + countComments(comment.replies), 0);
    };

    // Actions
    const handleLike = (id: number) => {
        setComments(prev => updateCommentTree(prev, id, (c) => ({ ...c, likes: c.likes + 1 })));
    };

    const handleReaction = (id: number, emoji: string) => {
        setComments(prev => updateCommentTree(prev, id, (c) => {
            const existing = c.reactions.find(r => r.emoji === emoji);
            let newReactions;
            if (existing) {
                newReactions = c.reactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
            } else {
                newReactions = [...c.reactions, { emoji, count: 1 }];
            }
            return { ...c, reactions: newReactions };
        }));
        setReactingTo(null);
    };

    const handleMainSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            const newComment: Comment = {
                id: Date.now(),
                name: formData.name,
                text: formData.comment,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                likes: 0,
                reactions: [],
                replies: []
            };
            setComments([newComment, ...comments]);
            setFormData({ name: "", email: "", comment: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleReplySubmit = (e: React.FormEvent, parentId: number) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            const newReply: Comment = {
                id: Date.now(),
                name: replyData.name,
                text: replyData.comment,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                likes: 0,
                reactions: [],
                replies: []
            };

            setComments(addReply(parentId, newReply, comments));
            setReplyData({ name: "", email: "", comment: "" });
            setReplyingTo(null);
            setIsSubmitting(false);
        }, 1000);
    };

    // Recursive component to render comments
    const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
        <div className={`mb-6 ${isReply ? 'ml-8 mt-4 border-l-2 border-gray-200 pl-4' : ''}`}>
            <div className={`bg-gray-50 p-6 rounded-lg border border-gray-100 ${isReply ? 'bg-white' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#1e3a8a]">{comment.name}</h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{comment.date}</span>
                </div>
                <p className="text-gray-700 mb-4">{comment.text}</p>

                {/* Actions Bar */}
                <div className="flex items-center gap-4 border-t border-gray-200 pt-3">
                    {/* Like Button */}
                    <button
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-secondary transition-colors"
                    >
                        <ThumbsUp className="w-4 h-4" />
                        Like {comment.likes > 0 && `(${comment.likes})`}
                    </button>

                    {/* React Button & Popover */}
                    <div className="relative">
                        <button
                            onClick={() => setReactingTo(reactingTo === comment.id ? null : comment.id)}
                            className="flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-secondary transition-colors"
                        >
                            <Smile className="w-4 h-4" /> React
                        </button>

                        {/* Reaction Picker */}
                        {reactingTo === comment.id && (
                            <div className="absolute top-8 left-0 bg-white shadow-xl border border-gray-200 p-2 rounded-lg flex gap-2 z-10 w-max animate-in fade-in zoom-in duration-200">
                                {AVAILABLE_REACTIONS.map(emoji => (
                                    <button
                                        key={emoji}
                                        onClick={() => handleReaction(comment.id, emoji)}
                                        className="hover:scale-125 transition-transform text-lg"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reply Button */}
                    <button
                        onClick={() => {
                            setReplyingTo(replyingTo === comment.id ? null : comment.id);
                            setReplyData({ name: "", email: "", comment: "" });
                            setReactingTo(null);
                        }}
                        className="text-xs font-bold uppercase text-gray-500 hover:text-secondary transition-colors"
                    >
                        {replyingTo === comment.id ? "Cancel" : "Reply"}
                    </button>
                </div>

                {/* Displayed Reactions */}
                {comment.reactions.length > 0 && (
                    <div className="flex gap-2 mt-3">
                        {comment.reactions.map(r => (
                            <span key={r.emoji} className="bg-white border border-gray-200 px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                                {r.emoji} {r.count}
                            </span>
                        ))}
                    </div>
                )}

                {/* Reply Form */}
                {replyingTo === comment.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="space-y-4">
                            <textarea
                                required
                                placeholder="Write your reply..."
                                rows={2}
                                className="w-full p-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-secondary"
                                value={replyData.comment}
                                onChange={(e) => setReplyData({ ...replyData, comment: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-2 border border-gray-300 rounded-sm text-sm"
                                    value={replyData.name}
                                    onChange={(e) => setReplyData({ ...replyData, name: e.target.value })}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded-sm text-sm"
                                    value={replyData.email}
                                    onChange={(e) => setReplyData({ ...replyData, email: e.target.value })}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                size="sm"
                                className="bg-secondary text-white hover:bg-primary font-bold uppercase tracking-widest text-xs px-4"
                            >
                                {isSubmitting ? "Replying..." : "Post Reply"}
                            </Button>
                        </form>
                    </div>
                )}
            </div>

            {/* Nested Replies */}
            {comment.replies.length > 0 && (
                <div className="mt-2">
                    {comment.replies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-extrabold uppercase text-[#1e3a8a] mb-8 tracking-tight">
                Comments ({countComments(comments)})
            </h3>

            {/* List of Comments */}
            <div className="mb-12">
                {comments.length === 0 ? (
                    <p className="text-gray-500 italic">No comments yet. Be the first to leave one!</p>
                ) : (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>

            {/* Main Comment Form */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h4 className="text-lg font-bold uppercase text-[#1e3a8a] mb-6">Leave a Message</h4>
                <form onSubmit={handleMainSubmit} className="space-y-6">
                    <div>
                        <textarea
                            required
                            placeholder="Your Comment *"
                            rows={4}
                            className="w-full p-4 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-gray-900"
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            required
                            type="text"
                            placeholder="Name *"
                            className="w-full p-4 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-gray-900"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            required
                            type="email"
                            placeholder="Email *"
                            className="w-full p-4 border border-gray-300 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-gray-900"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500">Your email address will not be published.</p>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#1e3a8a] text-white hover:bg-secondary font-bold uppercase tracking-widest rounded-none h-12 px-8 w-full md:w-auto"
                    >
                        {isSubmitting ? "Posting..." : "Post Comment"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
