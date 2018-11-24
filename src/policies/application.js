module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isOwner() {
        return this.record && (this.record.userId == this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isPremium() {
        return this.user && this.user.role == "premium";
    }

    _isStandard() {
        return this.user && this.user.role == "standard";
    }

    _isCollaborator() {
        return this.user && this.user.role == "collaborator";
    }

    _isPublic() {
        return this.record.private === false;
    }

    _isPrivate() {
        return this.record.private === true;
    }

    new() {
        return this.user != null;
    }

    create() {
        return this.new();
    }

    show() {
        return true;
    }

    edit() {
        if (this.record.private == false) {
            return this.new() &&
            this.record && (this._isStandard() || this._isPremium() || this._isAdmin());
        } else if (this.record.private == true) {
            return this.new() &&
            this.record && (this._isPremium() || this._isAdmin() || this._isStandard());
        }
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.new() &&
            this.record && (this._isOwner() || this._isAdmin());
    }
}