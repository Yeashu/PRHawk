import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { getConventions, learnConventions, saveConventions } from "../lib/api";
import RulesToolbar from "./rules/RulesToolbar";
import AddRuleForm from "./rules/AddRuleForm";
import RuleEditCard from "./rules/RuleEditCard";
import RuleCard from "./rules/RuleCard";
import LearnPanel from "./rules/LearnPanel";

export default function RulesTab({ accessKey, addToast }) {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [learning, setLearning] = useState(false);
  const [repoInput, setRepoInput] = useState("");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  // Custom rule creation form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [newRationale, setNewRationale] = useState("");
  const [newSeverity, setNewSeverity] = useState("suggestion");

  // Editing state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRule, setEditRule] = useState("");
  const [editRationale, setEditRationale] = useState("");
  const [editSeverity, setEditSeverity] = useState("suggestion");

  // Load conventions on component mount
  useEffect(() => {
    fetchConventions();
  }, []);

  const fetchConventions = async () => {
    setLoading(true);
    try {
      const data = await getConventions(accessKey);
      setRules(data.rules || []);
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLearn = async (e) => {
    e.preventDefault();
    if (!repoInput.trim()) {
      addToast("Please enter a repository name or URL.", "error");
      return;
    }

    setLearning(true);
    try {
      const data = await learnConventions(repoInput.trim(), accessKey);
      setRules(data.rules || []);
      setRepoInput("");
      addToast(`Learned ${data.rules?.length || 0} conventions!`, "success");
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    } finally {
      setLearning(false);
    }
  };

  const saveRulesToServer = async (updatedRules) => {
    try {
      await saveConventions(updatedRules, accessKey);
      setRules(updatedRules);
      return true;
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
      return false;
    }
  };

  const handleAddRule = async (e) => {
    e.preventDefault();
    if (!newRule.trim() || !newRationale.trim()) {
      addToast("Please fill out both the rule description and rationale.", "error");
      return;
    }

    const updatedRules = [
      ...rules,
      {
        rule: newRule.trim(),
        rationale: newRationale.trim(),
        severity: newSeverity,
      },
    ];

    const success = await saveRulesToServer(updatedRules);
    if (success) {
      setNewRule("");
      setNewRationale("");
      setNewSeverity("suggestion");
      setShowAddForm(false);
      addToast("Custom rule added!", "success");
    }
  };

  const handleDeleteRule = async (indexToDelete) => {
    if (!window.confirm("Are you sure you want to delete this convention rule?")) {
      return;
    }

    const updatedRules = rules.filter((_, idx) => idx !== indexToDelete);
    const success = await saveRulesToServer(updatedRules);
    if (success) {
      addToast("Rule deleted.", "success");
    }
  };

  const startEdit = (index) => {
    const ruleObj = rules[index];
    setEditingIndex(index);
    setEditRule(ruleObj.rule);
    setEditRationale(ruleObj.rationale);
    setEditSeverity(ruleObj.severity);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveEdit = async (index) => {
    if (!editRule.trim() || !editRationale.trim()) {
      addToast("Please fill out both the rule description and rationale.", "error");
      return;
    }

    const updatedRules = rules.map((r, idx) => {
      if (idx === index) {
        return {
          rule: editRule.trim(),
          rationale: editRationale.trim(),
          severity: editSeverity,
        };
      }
      return r;
    });

    const success = await saveRulesToServer(updatedRules);
    if (success) {
      setEditingIndex(null);
      addToast("Rule updated successfully!", "success");
    }
  };

  // Filter and search rules list
  const filteredRules = rules.filter((r) => {
    const matchesQuery = r.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.rationale.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === "all" || r.severity === severityFilter;
    return matchesQuery && matchesSeverity;
  });

  return (
    <div className="rules-container">
      {/* Left Column: Rules Manager */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        <RulesToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          showAddForm={showAddForm}
          onShowAddForm={() => setShowAddForm(true)}
        />

        {showAddForm && (
          <AddRuleForm
            rule={newRule}
            setRule={setNewRule}
            rationale={newRationale}
            setRationale={setNewRationale}
            severity={newSeverity}
            setSeverity={setNewSeverity}
            onSubmit={handleAddRule}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Rules List */}
        <div className="rules-list">
          {loading && (
            <div className="empty-state">
              <div className="loader-spinner" style={{ width: "30px", height: "30px" }}></div>
              <div className="empty-state-title">Loading Conventions...</div>
            </div>
          )}

          {!loading && filteredRules.length === 0 && (
            <div className="empty-state">
              <BookOpen size={40} className="empty-state-icon" />
              <div className="empty-state-title">No Rules Configured</div>
              <div className="empty-state-desc">
                {searchQuery || severityFilter !== "all"
                  ? "No conventions match your search criteria."
                  : "Start by learning conventions from a github repository using the panel on the right, or add a custom rule manually."}
              </div>
            </div>
          )}

          {!loading && filteredRules.map((ruleObj) => {
            // Find global index of this rule in the main rules array
            const globalIndex = rules.indexOf(ruleObj);
            const isEditing = editingIndex === globalIndex;

            if (isEditing) {
              return (
                <RuleEditCard
                  key={globalIndex}
                  rule={editRule}
                  setRule={setEditRule}
                  rationale={editRationale}
                  setRationale={setEditRationale}
                  severity={editSeverity}
                  setSeverity={setEditSeverity}
                  onSave={() => handleSaveEdit(globalIndex)}
                  onCancel={cancelEdit}
                />
              );
            }

            return (
              <RuleCard
                key={globalIndex}
                ruleObj={ruleObj}
                onEdit={() => startEdit(globalIndex)}
                onDelete={() => handleDeleteRule(globalIndex)}
              />
            );
          })}
        </div>
      </div>

      {/* Right Column: Learn Conventions Panel */}
      <LearnPanel
        repoInput={repoInput}
        setRepoInput={setRepoInput}
        learning={learning}
        onSubmit={handleLearn}
      />
    </div>
  );
}
