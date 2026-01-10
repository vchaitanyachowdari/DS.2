import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Download, ArrowLeft, CheckCircle, AlertTriangle, Star, TrendingUp, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReviewResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const repoUrl = location.state?.repoUrl || '';

  // Mock review data
  const reviewData = {
    qualityScore: 7.8,
    repoName: repoUrl.split('/').slice(-2).join('/') || 'your-repo',
    reviewDate: new Date().toLocaleDateString(),
    strengths: [
      'Well-structured codebase with clear separation of concerns',
      'Comprehensive documentation with examples',
      'Good test coverage (78%)',
      'Follows consistent coding style and conventions'
    ],
    improvements: [
      'Consider adding input validation in user-facing functions',
      'Some functions could be refactored to reduce complexity',
      'Add more inline comments for complex algorithms',
      'Update dependencies to latest stable versions'
    ],
    keySuggestions: [
      'Implement error handling for edge cases in data processing modules',
      'Add type hints for better code maintainability',
      'Consider implementing a CI/CD pipeline for automated testing'
    ],
    fullReview: `This repository demonstrates solid software engineering practices with a well-organized structure and clear documentation. The code follows modern best practices and shows good understanding of design patterns.

Key Strengths:
The project maintains excellent code organization with logical module separation. Documentation is thorough and includes helpful examples for users. The test coverage of 78% indicates a commitment to code quality, though there's room for improvement to reach the industry standard of 80%+.

Areas for Enhancement:
While the overall code quality is strong, some functions exhibit high cyclomatic complexity that could benefit from refactoring. Input validation should be strengthened, particularly in user-facing APIs. Adding more inline comments would improve maintainability for future contributors.

Security Considerations:
The codebase follows secure coding practices, but consider implementing additional input sanitization and updating dependencies to patch known vulnerabilities.

Performance:
The code is generally well-optimized, though some database queries could benefit from indexing. Consider implementing caching strategies for frequently accessed data.

Recommendations:
1. Set up automated testing with CI/CD
2. Increase test coverage to 85%+
3. Refactor complex functions into smaller, testable units
4. Add comprehensive error handling
5. Document API endpoints with OpenAPI/Swagger

Overall, this is a well-maintained project that shows professional development practices. With the suggested improvements, it could serve as an excellent reference implementation.`
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-success-600 bg-success-50 border-success-200';
    if (score >= 6) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-error-600 bg-error-50 border-error-200';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Improvement';
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here. This would generate a professional PDF report with all review details.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">LearnAI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/dashboard" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/create" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Create Video
              </Link>
              <Link to="/review" className="text-base font-medium text-primary-600 border-b-2 border-primary-600 pb-1">
                Review Project
              </Link>
            </div>

            {user && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-600">{user.avatar}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/review')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Review</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Code Review Results
              </h1>
              <p className="text-gray-600">{reviewData.repoName}</p>
              <p className="text-sm text-gray-500 mt-1">Reviewed on {reviewData.reviewDate}</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                       hover:bg-primary-700 transition-colors
                       flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {/* Quality Score */}
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 ${getScoreColor(reviewData.qualityScore)}`}>
            <Star className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">{reviewData.qualityScore}/10</div>
              <div className="text-sm font-medium">{getScoreLabel(reviewData.qualityScore)}</div>
            </div>
          </div>
        </div>

        {/* Key Suggestions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Key Suggestions
            </h2>
          </div>
          <ul className="space-y-3">
            {reviewData.keySuggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-semibold text-primary-600">{idx + 1}</span>
                </div>
                <p className="text-gray-700">{suggestion}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-success-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Strengths
              </h3>
            </div>
            <ul className="space-y-3">
              {reviewData.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{strength}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-warning-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Areas for Improvement
              </h3>
            </div>
            <ul className="space-y-3">
              {reviewData.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{improvement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Review */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Detailed Review
            </h2>
          </div>
          <div className="prose prose-gray max-w-none">
            {reviewData.fullReview.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/review')}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium
                     hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Review Another Project
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
                     hover:bg-primary-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewResultsPage;
